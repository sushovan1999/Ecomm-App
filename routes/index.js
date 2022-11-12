let express = require('express');
let router = express.Router();
let categoryController = require("./../controller/category.controller")
let categoryRoutes = require('./categories.route');
let productRoutes = require('./products.route');
router.get("/" , (req,res,next)=> {
    res.write("this is the base page");
    res.end();
});
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);


module.exports = router;
