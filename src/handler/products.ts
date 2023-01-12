import express, { Request, Response, NextFunction } from "express";
import authenticate from "../model/authenticate";
import { productData, products_store } from "../model/products";
import fileUpload from "express-fileupload";
import uploadImage from "./uploadImage";
const store = new products_store();

express().use(fileUpload());
const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const imgsrc = req.file?.buffer.toString("base64");
    const productData = {
      product_name: req.body.product_name,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      image: imgsrc,
    } as productData;
    await store.create(req.params.id, productData);
    res.render("addProduct", {
      message: true,
      id: req.params.id,
    });
  } catch (error) {
    next(error);
  }
};

const showPage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.render("addProduct", {
      id: req.params.id,
      pageTitle: "add product",
      message: undefined,
    });
  } catch (error) {
    next(error);
  }
};

const showALl = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result: productData[] = await store.index();
    if (result) {
      res.render("products", {
        id: req.params.id,
        products: result,
        pageTitle: "Products",
      });
    }
  } catch (error) {
    next(error);
  }
};

const showOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await store.show(
      req.params.id,
      parseInt(req.params.product_id)
    );
    res.json({ product: result });
  } catch (error) {
    next(error);
  }
};

const edit = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await store.edit(
      req.params.id,
      parseInt(req.params.product_id),
      req.body
    );
    // store token in cookies to check authorization
    res.json({ product: result });
  } catch (error) {
    next(error);
  }
};

const Delete = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await store.delete(
      req.params.id,
      parseInt(req.params.product_id)
    );
    res.json({ product: result });
  } catch (error) {
    next(error);
  }
};

const products_routers = async (app: express.Application) => {
  app.get("/product/:id", authenticate, showPage); // show add product page
  app.get("/products/:id", authenticate, showALl); // show all products
  app.post("/product/:id", authenticate, uploadImage, create); // Create  New product
  app.get("/product/:id/:product_id", authenticate, showOne); // show one product by id
  // sorry this endpoint must run on any API platform
  app.post("/product/:id/update/:product_id", authenticate, edit); // Create  New product
  // sorry this endpoint must run on any API platform
  app.post("/product/:id/delete/:product_id", authenticate, Delete); // Create  New product
};

export default products_routers;
