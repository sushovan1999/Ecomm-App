let db = {};

db.roles = require("./roles");
db.user = require("./user");
db.product = require("./product");
db.cart = require("./cart");

db.roles.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId,",
});

db.user.belongsToMany(db.roles, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId,",
});

db.product.belongsToMany(db.cart, {
  through: "cart_products",
  foreignKey: "productId",
  otherKey: "cartId",
});

db.cart.belongsToMany(db.product, {
  through: "cart_products",
  foreignKey: "cartId",
  otherKey: "productId",
});

db.Roles = ["user", "admin"];

module.exports = db;
