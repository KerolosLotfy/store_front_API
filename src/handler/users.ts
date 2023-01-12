import express, { Request, Response, NextFunction } from "express";
import { userData, users_store } from "../model/users";
import jwt from "jsonwebtoken";
import authenticate from "../model/authenticate";

const tokenScrect = process.env.TOKEN_SECRET;

const store = new users_store();

const create = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userData = req.body as userData;
        const result: userData | false = await store.create(userData);
        if (result) {
            // sign with token
            jwt.sign(result, tokenScrect as string);
            res.render("signup", {
                newUser: true,
            });
        } else {
            res.render("signup", {
                newUser: false,
            });
        }
    } catch (error) {
        next(error);
    }
};

const showALl = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const result: userData[] = await store.index();
        res.json({
            action: "show all users ",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<number | undefined | void> => {
    try {
        const result: userData | false | null = await store.login(
            req.body.email,
            req.body.pass
        );
        if (result === null) {
            res.render("login", {
                check: null,
            });
        } else if (result === false) {
            res.render("login", {
                check: false,
            });
        } else {
            const token = jwt.sign(result, tokenScrect as string);
            res.cookie("Token", token, {
                httpOnly: true,
            }).redirect(`/store/${result.id}`);

            next();
        }
    } catch (error) {
        next(error);
    }
};

const show = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const result = await store.show(parseInt(req.params.id));
        if (req.path.split("/")[1] === "profile") {
            res.render("profile", {
                user: result as userData,
                pageTitle: "profile",
            });
        } else {
            res.render("store", {
                user: result as userData,
            });
        }
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
        await store.edit(parseInt(req.params.id), req.body);
        // store token in cookies to check authorization
        res.clearCookie("Token");
        res.redirect(`/store/login`);
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
        await store.delete(parseInt(req.params.id));
        res.clearCookie("Token");
        res.redirect("/store/login");
    } catch (error) {
        next(error);
    }
};

const users_routers = async (app: express.Application) => {
    app.post("/store/signup", create); // Create  New User Done
    app.post("/store/login", login); // Login User
    app.get("/store/:id", authenticate, show); // show User by id
    app.get("/profile/:id", authenticate, show); // show profile page
    app.post("/update/:id", authenticate, edit); // update user
    app.post("/delete/:id", authenticate, Delete); // update user
    app.get("/users/:id", authenticate, showALl); // show all  users
};

export default users_routers;
