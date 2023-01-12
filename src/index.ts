import express from "express";
import path from "path";
import users_routers from "./handler/users";
import cookieParser from "cookie-parser";
import products_routers from "./handler/products";
import orders_routers from "./handler/orders";
import { errorHandler } from "./handler/errorHandler";
import order_products_routers from "./handler/order_products";

const app = express();
const hostName = "127.0.0.1";
const port = 3030;
//
app.use(express.static(path.join(__dirname, "..", "website")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", "./website");

app.get("/", (_req, res, _next) => {
  res.render("index", {
    pageTitle: "profile",
  });
});
app.get("/store", (_req, res, _next) => {
  res.render("index", {
    pageTitle: "Home",
  });
});

app.get("/store/login", (_req, res, _next) => {
  res.render("login", {
    pageTitle: "login",
    check: undefined,
  });
});

app.get("/store/signup", (_req, res, _next) => {
  res.render("signup", {
    pageTitle: "signup",
    newUser: undefined,
  });
});

users_routers(app);
products_routers(app);
orders_routers(app);
order_products_routers(app);

app.use(errorHandler);
app.use((_req, res, _next) => {
  res.json({
    status: 401,
    message: "route not found",
  });
});

app.listen(port, hostName, () => {
  console.log(`Server Running on http://${hostName}:${port}`);
});

export default app;
