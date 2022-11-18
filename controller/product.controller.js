let Products = require("../model/product");
let dbconnection = require("../config/db.config");

let getAllProducts = async (req, res) => {
  let product = await Products.findAll();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(product, null, 2));
  res.end();
};

let getProductById = async (req, res) => {
  let id = req.params.productId;
  if (!id) {
    res.status(400).send("ID not passed");
  }
  let products = await Products.findAll({
    where: {
      id: id,
    },
  });
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(products));
  res.end();
};

let addNewProduct = async (req, res, next) => {
  let nameToAdd = req.body.name;
  let priceToAdd = req.body.price;
  let categoryIdToAdd = req.body.categoryId;
  await Products.create({
    name: nameToAdd,
    price: priceToAdd,
    categoryId: categoryIdToAdd,
  });

  res.status(201).send("New product added");
  res.end();
};

let deleteProductById = async (req, res, next) => {
  let id = req.params.productId;
  await Products.destroy({
    where: {
      id: id,
    },
  });

  res.status(200).send("product deleted");
  res.end();
};

let updateProductById = async (req, res, next) => {
  if (!req.body.name) {
    res.status(500).send("please pass Products name");
    res.end();
  }
  let id = req.params.productId;
  let ProductsToUpdate = {
    name: req.body.name,
  };
  await Products.update(ProductsToUpdate, {
    where: {
      id: id,
    },
  });
  let updateProducts = await Products.findByPk(id);
  res.status(200).send(updateProducts);
};

let insertProducts = async () => {
  await Products.bulkCreate([
    {
      name: "Samsung Galaxy Note",
      categoryId: 1,
      price: 18000,
    },
    {
      name: "Iphone 13",
      categoryId: 1,
      price: 60000,
    },
    {
      name: "Sony bravia",
      categoryId: 2,
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
      categoryId: 2,
      price: 32000,
    },
  ]);
};
// createTable();
// insertProducts();

module.exports = {
  getAllProducts,
  updateProductById,
  getProductById,
  addNewProduct,
  deleteProductById,
};
