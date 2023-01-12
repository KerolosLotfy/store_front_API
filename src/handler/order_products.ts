import express, { Request, Response, NextFunction } from "express";
import authenticate from "../model/authenticate";
import { orderProducts, order_productsStore } from "../model/order_products";
const store = new order_productsStore();

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await store.create(
      req.params.order_id,
      req.params.product_id,
      parseInt(req.body.quantity as unknown as string)
    );
    res.json({
      action: "create one Order-products by user_id and order_id]",
      data: result,
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
    const result: orderProducts[] = await store.index(
      req.params.order_id,
      req.params.product_id
    );
    res.json({
      action: "show all one Order-products by user_id and order_id]",
      data: result,
    });
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
      req.params.order_id,
      req.params.product_id,
      parseInt(req.params.order_products_id)
    );
    res.json({
      action:
        "show one  Order-products by user_id and order_id and order_producst_id ",
      data: result,
    });
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
      req.params.order_id,
      req.params.product_id,
      parseInt(req.params.order_products_id),
      parseInt(req.body.quantity)
    );
    res.json({
      action:
        "update one  Order-products by user_id and order_id and order_producst_id",
      data: result,
    });
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
      req.params.order_id,
      req.params.product_id,
      parseInt(req.params.order_products_id)
    );
    res.json({
      action:
        "Delete one  Order-products by user_id and order_id and order_producst_id",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const order_products_routers = async (app: express.Application) => {
  app.get("/order/:id/:order_id/:product_id", authenticate, showALl); // show all orders
  app.post("/order/:id/:order_id/:product_id", authenticate, create); // Create  New order
  app.get(
    "/order/:id/:order_id/:product_id/:order_products_id",
    authenticate,
    showOne
  ); // show one order by id
  app.post(
    "/order/:id/:order_id/:product_id/update/:order_products_id",
    authenticate,
    edit
  ); // update   order
  app.post(
    "/order/:id/:order_id/:product_id/delete/:order_products_id",
    authenticate,
    Delete
  ); // Delete order
};

export default order_products_routers;
