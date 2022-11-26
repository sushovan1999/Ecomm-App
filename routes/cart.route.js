let express = require("express");
let cartRouter = express.Router();
let cartController = require("./../controller/cart.controller");
let authjwt = require("./../middlewares/authjwt");

cartRouter.post("/", [authjwt.VerifyToken], cartController.createCart);
cartRouter.put("/:cartId", [authjwt.VerifyToken], cartController.updateCart);
cartRouter.get("/:cartId", [authjwt.VerifyToken], cartController.getCart);

module.exports = cartRouter;
