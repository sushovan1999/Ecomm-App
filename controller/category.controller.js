
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

let getCategoryById = async (req, res)=>{

    let id = req.params.categoryId;
    if(!id){
        res.status(400).send("ID not passed");
    }
    let Categories = await categories.findAll({
        where : {
            id : id
        }
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(Categories));
    res.end();
}

let addNewCategory = async (req,res,next) =>{
    let categoryToAdd = req.body.name;
    await categories.create({
        name : categoryToAdd
    });

    res.status(201).send("New category added");
    res.end();
}

let deleteCategoryById = async (req,res,next) => {
    let id = req.params.categoryId;
    await categories.destroy({
        where : {
            id : id
        }
    });

    res.status(200).send("category deleted");
    res.end();
}

module.exports = { getAllCategories, getCategoryById, addNewCategory, deleteCategoryById}