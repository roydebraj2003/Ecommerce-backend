const express = require("express");
const product = require("../model/model");

const getProductsHome = async (req, res) => {
  try {
    const productsHome = await product.find({});
    res.status(200).json({ nbHits: productsHome.length, productsHome });
  } catch (error) {
    console.log(error);
    res.status(500).send(`There's an error: ${error.message}`);
  }
};

const getProducts = async (req, res) => {
  try {
    const { name, company, sort, numericFilters, fields } = req.query;
    console.log(req.query);
    const queryParams = {};

    if (name) {
      queryParams.name = { $regex: name, $options: "i" };
    }
    if (company) {
      queryParams.company = company;
    }
    if (numericFilters) {
      const operatorMap = {
        ">": "$gt",
        ">=": "$gte",
        "=": "$eq",
        "<": "$lt",
        "<=": "$lte",
      };
      const regEx = /\b(<|>|>=|=|<|<=)\b/g;
      let filters = numericFilters.replace(
        regEx,
        (match) => `-${operatorMap[match]}-`
      );
      const options = ["price", "rating"];
      filters = filters.split(",").forEach((item) => {
        const [field, operator, value] = item.split("-");
        if (options.includes(field)) {
          queryParams[field] = { [operator]: Number(value) };
        }
      });
    }

    let result = product.find(queryParams);
    if (sort) {
      const sortList = sort.split(",").join(" ");
      result = result.sort(sortList);
    } else {
      result = result.sort("createdAt");
    }

    if (fields) {
      const fieldsList = fields.split(",").join(" ");
      result = result.select(fieldsList);
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const products = await result;
    res.status(200).json({ nbHits: products.length, products });
  } catch (error) {
    res.status(500).send(`There's an error: ${error.message}`);
  }
};

module.exports = { getProducts, getProductsHome };
