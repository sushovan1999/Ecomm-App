const express = require("express");
let bodyParser = require("body-parser");
const serverConfig = require("./config/server.config");
const router = require("./routes/index");
const ErrorHandler = require("./middlewares/Errorhandler");
const expressApp = express();
const dbconnection = require("../Ecomm App/config/db.config");
const category = require("./model/category");
const Products = require("./model/product");
const Roles = require("./model/roles");
expressApp.use(bodyParser.json());
expressApp.use(router);
expressApp.use(ErrorHandler);

category.hasMany(Products);

let init = async () => {
  await dbconnection.sync({ force: true });
  insertCategories();
  insertRoles();
};
let insertCategories = async () => {
  await category.bulkCreate([
    {
      name: "Fashion",
    },
    {
      name: "mobile",
    },
    {
      name: "Electronics",
    },
    {
      name: "Appliances",
    },
  ]);
};
let insertRoles = async () => {
  Roles.bulkCreate([
    {
      id: 1,
      name: "user",
    },
    {
      id: 2,
      name: "admin",
    },
  ]);
};

expressApp.listen(serverConfig.PORT, () => {
  console.log("Server listening at port " + serverConfig.PORT);
  init();
});
