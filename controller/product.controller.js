const db = require("./../model/index");

let getAllProducts = async (req, res, next) => {
  let categoryId = req.query.categoryId;
  let minPrice = req.query.minPrice;
  let maxPrice = req.query.maxPrice;
  let products = [];

  if (Object.keys(req.query).length == 0) {
    products = await db.product.findAll();
  } else {
    if (categoryId && !(minPrice || maxPrice)) {
      products = await filterByCategory(categoryId);
    } else if (!categoryId && minPrice && maxPrice) {
      products = await filterByPriceRange(minPrice, maxPrice);
    } else {
      products = await db.product.findAll({
        where: {
          categoryId: categoryId,
          price: {
            [db.sequelize.Op.gte]: minPrice,
            [db.sequelize.Op.lte]: maxPrice,
          },
        },
      });
    }
  }

  res.status(200).json(products);
  res.end();
};

let filterByCategory = async (categoryId) => {
  let filteredProducts = await db.product.findAll({
    where: {
      categoryId: categoryId,
    },
  });

  return filteredProducts;
};

let filterByPriceRange = async (minPrice, maxPrice) => {
  let filteredProducts = await db.product.findAll({
    where: {
      price: {
        [db.sequelize.Op.gte]: minPrice,
        [db.sequelize.Op.lte]: maxPrice,
      },
    },
  });

  return filteredProducts;
};

let getProductById = async (req, res) => {
  let id = req.params.productId;
  if (!id) {
    res.status(400).send("ID not passed");
  }
  let products = await db.product.findAll({
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
  await db.product.create({
    name: nameToAdd,
    price: priceToAdd,
    categoryId: categoryIdToAdd,
  });

  res.status(201).send("New product added");
  res.end();
};

let deleteProductById = async (req, res, next) => {
  let id = req.params.productId;
  await db.product.destroy({
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
  await db.product.update(ProductsToUpdate, {
    where: {
      id: id,
    },
  });
  let updateProducts = await db.product.findByPk(id);
  res.status(200).send(updateProducts);
};

let createProduct = async (req, res, next) => {
  let productToAdd = req.body;
  try {
    await db.product.create(productToAdd);
    res.status(201).json(productToAdd);
  } catch (err) {
    res.status(500).json({
      message: "Some internal error occured",
    });
  }
};

module.exports = {
  getAllProducts,
  updateProductById,
  getProductById,
  addNewProduct,
  deleteProductById,
  createProduct,
};
