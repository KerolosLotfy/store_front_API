import express, { Request, Response, NextFunction } from "express";
import authenticate from "../model/authenticate";
import { orderType, orders_store } from "../model/orders";
const store = new orders_store();

const create = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const result = await store.create(req.params.id, req.body);
        res.json({
            action: "create order",
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
        const result: orderType[] = await store.index(req.params.id);
        res.json({
            action: "show all Orders by user id",
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
            req.params.id,
            parseInt(req.params.order_id)
        );
        res.json({
            action: "show one Order by user_id ",
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
            req.params.id,
            parseInt(req.params.order_id),
            req.body
        );
        res.json({
            action: "update one Order by user_id and order_id",
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
            req.params.id,
            parseInt(req.params.order_id)
        );
        res.json({
            action: "Delete one Order by user_id and order_id",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const orders_routers = async (app: express.Application) => {
    app.get("/orders/:id", authenticate, showALl); // show all orders
    app.post("/orders/:id", authenticate, create); // Create  New order
    app.get("/orders/:id/:order_id", authenticate, showOne); // show one order by id
    app.post("/orders/:id/update/:order_id", authenticate, edit); // update   order
    app.post("/orders/:id/delete/:order_id", authenticate, Delete); // Delete order
};

export default orders_routers;
