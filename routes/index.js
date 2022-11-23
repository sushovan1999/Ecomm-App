let express = require("express");
let router = express.Router();
let categoryRoutes = require("./categories.route");
let productRoutes = require("./products.route");
let authRoute = require("./auth.route");
router.get("/", (req, res, next) => {
  res.write("this is the base page");
  res.end();
});
router.use("/ecomm/api/v1/categories", categoryRoutes);
router.use("/ecomm/api/v1/products", productRoutes);
router.use("/ecomm/api/v1/auth", authRoute);

module.exports = router;
