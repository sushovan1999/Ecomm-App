let categories = require("../model/category");
let sequelizeInstance = require("../config/db.config");

let getAllCategories = async (req, res, next) => {
  let cate = await categories.findAll();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(cate, null, 2));
  res.end();
};

let getCategoryById = async (req, res) => {
  let id = req.params.categoryId;
  let Categories = await categories.findAll({
    where: {
      id: id,
    },
  });
  res.status(200).json(Categories);
  res.end();
};

let addNewCategory = async (req, res, next) => {
  try {
    let categoryToAdd = req.body.name;
    await categories.create({
      name: categoryToAdd,
    });
    res.status(201).send("New category added");
    res.end();
  } catch (err) {
    next(err);
  }
};

let deleteCategoryById = async (req, res, next) => {
  let id = req.params.categoryId;
  await categories.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).send("category deleted");
  res.end();
};

let updateCategoryById = async (req, res, next) => {
  let id = req.params.categoryId;
  let categoryToUpdate = {
    name: req.body.name,
  };
  await categories.update(categoryToUpdate, {
    where: {
      id: id,
    },
  });
  let updateCategory = await categories.findByPk(id);
  res.status(200).json(updateCategory);
  res.end();
};
let all = {
  updateCategoryById,
  getAllCategories,
  getCategoryById,
  addNewCategory,
  deleteCategoryById,
};
module.exports = all;
