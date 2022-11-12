let sequelize = require("sequelize");
let dbconnection = require("../config/db.config");

module.exports = dbconnection.define("categories", {
    id : {
        primaryKey: true,
        notNull: true,
        type: sequelize.DataTypes.INTEGER,
        autoIncrement: true
    },
    name : {
        notNull: true,
        type: sequelize.DataTypes.STRING,
    }
})

