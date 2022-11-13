let Products = require("../model/product");
let dbconnection = require("../config/db.config");

let getAllProducts = async (req, res)=>{
    let product = await Products.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(product,null,2));
    res.end();
}

let getProductById =async (req, res)=>{

    let id = req.params.productId;
    if(!id){
        res.status(400).send("ID not passed");
    }
    let products = await Products.findAll({
        where : {
            id : id
        }
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(products));
    res.end();
}



let createTable =async () => {
    await dbconnection.sync();
    console.log("Product table is created");
}
let insertProducts = async() =>{
    await Products.bulkCreate(
        [
            {
                name:"Samsung Galaxy Note",
                categoryId:1,
                price : 18000
            },
            {
                name:"Iphone 13",
                categoryId:1,
                price : 60000
            },
            {
                name:"Sony bravia",
                categoryId:2,
                price : 40000
            },
            {
                name:"Boat Rugged",
                categoryId:5,
                price : 4000
            },
            {
                name:"JBL Storm",
                categoryId:5,
                price : 9000
            },
            {
                name:"Vu 5",
                categoryId:2,
                price : 32000
            }
           
        ]
);
}
// createTable();
// insertProducts();

module.exports = {getAllProducts , getProductById }