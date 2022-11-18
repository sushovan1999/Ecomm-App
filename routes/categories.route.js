let express = require("express");
let categoryRouter = express.Router();
let categoryController = require("./../controller/category.controller");
let requestValidator = require("../middlewares/RequestValidator");
categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get(
  "/:categoryId",
  [requestValidator.validateReqForCategoryId],
  categoryController.getCategoryById
);
categoryRouter.put(
  "/:categoryId",
  [
    requestValidator.validateRequestForCategoryName,
    requestValidator.validateReqForCategoryId,
  ],
  categoryController.updateCategoryById
);
categoryRouter.post(
  "/",
  [requestValidator.validateRequestForCategoryName],
  categoryController.addNewCategory
);
categoryRouter.delete(
  "/:categoryId",
  [requestValidator.validateReqForCategoryId],
  categoryController.deleteCategoryById
);

module.exports = categoryRouter;
