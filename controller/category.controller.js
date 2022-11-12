
let categories = require("../model/category");
let sequelizeInstance = require("../config/db.config");
let createTable = async () => {
    await sequelizeInstance.sync({force : true});
    insertCategories();
    console.log("Table created successfully")

}
let insertCategories = async () => {
    await categories.bulkCreate([
        {
            name : "Fashion"
        },
        {
            name : "mobile"
        },
        {
            name : "Electronics"
        },
        {
            name : "Appliances"
        }
    ])
}
// createTable();
let getAllCategories = async (req,res,next)=> {
    let cate = await categories.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(cate,null,2));
    res.end();
 
}



let getCategoryById = (req, res, next) =>{
    res.write("I am at category page : " + req.params.categoryId);
    res.end()
}

module.exports = { getAllCategories, getCategoryById }