module.exports = (sequelize, dbconnection) => {
  let cart = dbconnection.define(
    "cart",
    {
      id: {
        type: sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cost: {
        type: sequelize.DataTypes.DECIMAL,
      },
    },
    {
      timestamps: false,
    }
  );
  return cart;
};
