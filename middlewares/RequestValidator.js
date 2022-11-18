const categories = require("../model/category");
const validateRequestForCategoryName = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      messege: "category name is void",
    });
  }
  next();
};

const validateReqForCategoryId = async (req, res, next) => {
  let categoryId = req.params.categoryId;
  if (categoryId) {
    let category = await categories.findByPk(categoryId);
    if (!category) {
      res.status(400).send({
        messege: "category does not exist",
      });
    }
  } else {
    res.status(400).send({
      messege: "category id is missing",
    });
  }
  next();
};

module.exports = { validateRequestForCategoryName, validateReqForCategoryId };
