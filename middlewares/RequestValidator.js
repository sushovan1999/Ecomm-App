const Categories = require("./../model/category");

const validateReqForCategoryName = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Category name is required",
    });
    return;
  }
  next();
};

const validateReqForCategoryId = async (req, res, next) => {
  let CategoryId = req.params.categoryId;
  if (CategoryId) {
    let category = await Categories.findByPk(CategoryId);
    if (!category) {
      res.status(400).send({
        message: "Category does not exist",
      });
      return;
    }
    next();
  } else {
    res.status(400).send({
      message: "Category id is missing",
    });
  }
  // res.end();
};

module.exports = { validateReqForCategoryName, validateReqForCategoryId };
