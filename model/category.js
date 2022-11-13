let sequelize = require("sequelize");
let dbconnection = require("../config/db.config");

let categoryModel = dbconnection.define("categories", {
    id : {
        primaryKey: true,
        type: sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        notNull: true
    },
    name : {
        allowNull: false,
        type: sequelize.DataTypes.STRING,
        notNull: true
    }
},
{
    timestamps : false
    }
)

module.exports=categoryModel;