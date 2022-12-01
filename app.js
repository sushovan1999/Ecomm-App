const express = require("express");
let bodyParser = require("body-parser");
const router = require("./routes/index");
const ErrorHandler = require("./middlewares/Errorhandler");
const db = require("./model/index");
const expressApp = express();
expressApp.use(bodyParser.json());
expressApp.use(router);
expressApp.use(ErrorHandler);

db.category.hasMany(db.product);

db.connection.sync({ force: true }).then(() => {
  init();
});

let init = async () => {
  insertCategories();
  insertProducts();
  insertRoles();
};
let insertCategories = async () => {
  await db.category.bulkCreate([
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
  db.roles.bulkCreate([
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
let insertProducts = async () => {
  await db.product.bulkCreate([
    {
      name: "Hrx",
      categoryId: 1,
      price: 18000,
    },
    {
      name: "Iphone 13",
      categoryId: 2,
      price: 60000,
    },
    {
      name: "Sony bravia",
      categoryId: 3,
      price: 40000,
    },
    {
      name: "Boat Rugged",
      categoryId: 4,
      price: 4000,
    },
    {
      name: "JBL Storm",
      categoryId: 4,
      price: 9000,
    },
    {
      name: "Vu 5",
      categoryId: 3,
      price: 32000,
    },
  ]);
};

module.exports = expressApp;
