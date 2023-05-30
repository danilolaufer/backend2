const express = require("express");
const cartsRouter = require("./cart.route.js");
const productRouter = require("./product.route.js");

const indexRouter = express.Router();

indexRouter.use("/carts", cartsRouter);
indexRouter.use("/products", productRouter);

module.exports = indexRouter;

