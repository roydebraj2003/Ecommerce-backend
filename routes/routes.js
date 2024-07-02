const express = require("express");
const Router = express.Router();
const { getProducts, getProductsHome } = require("../controllers/controll");

Router.route("/").get(getProducts);
Router.route("/home").get(getProductsHome);

module.exports = Router;
