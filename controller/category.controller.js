const db = require("./../model/index");

let getAllCategories = async (req, res, next) => {
  try {
    let categories = await db.category.findAll();
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json({
      message: "Some internal error occured",
    });
  }
};

let getCategoryById = async (req, res) => {
  let id = req.params.categoryId;
  let Categories = await db.category.findAll({
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
    await db.category.create({
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
  await db.category.destroy({
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
  await db.category.update(categoryToUpdate, {
    where: {
      id: id,
    },
  });
  let updateCategory = await db.category.findByPk(id);
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
