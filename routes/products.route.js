let express = require("express");
let productRouter = express.Router();
let productController = require("../controller/product.controller");
let authjwt = require("./../middlewares/authjwt");

productRouter.get("/", [authjwt.VerifyToken], productController.getAllProducts);
productRouter.get("/:productId", productController.getProductById);
productRouter.post("/", productController.addNewProduct);
productRouter.delete("/:productId", productController.deleteProductById);
productRouter.put("/:productId", productController.updateProductById);

module.exports = productRouter;
