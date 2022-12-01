module.exports = (sequelize, dbconnection) => {
  let Products = dbconnection.define(
    "Products",
    {
      id: {
        primaryKey: true,
        notNull: true,
        autoIncrement: true,
        type: sequelize.DataTypes.INTEGER,
      },

      name: {
        notNull: true,
        type: sequelize.DataTypes.STRING,
      },
      price: {
        notNull: true,
        type: sequelize.DataTypes.BIGINT,
      },
    },
    {
      timestamps: false,
    }
  );
  return Products;
};
