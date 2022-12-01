const db = require("./../model/index");

let createCart = async (req, res, next) => {
  let cart = req.body;
  try {
    await db.cart.create(cart);
    res.status(200).json({
      message: "Cart Created",
    });
  } catch (err) {
    res.status(401).json({
      message: " Some Internal Error happened",
    });
  }
};

let updateCart = async (req, res, next) => {
  const cartId = req.params.cartId;
  let cartToUpdate = await db.cart.findByPk(cartId);
  if (cartToUpdate) {
    let productsToAdd = await db.product.findAll({
      where: {
        id: req.body.productId,
      },
    });

    if (productsToAdd) {
      await cartToUpdate.setProducts(productsToAdd);
      console.log("Product added");
      let TotalCost = 0;
      let productSelected = [];
      let products = await cartToUpdate.getProducts();
      for (let i = 0; i < products.length; i++) {
        TotalCost = TotalCost + products[i].price;
        productSelected.push({
          id: products[i].id,
          name: products[i].name,
          cost: products[i].price,
        });
      }
      res.status(200).json({
        id: cartToUpdate.id,
        productSelected,
        TotalCost,
      });
    }
  }
};

let getCart = async (req, res, next) => {
  let cart = await db.cart.findByPk(req.params.cartId);
  let TotalCost = 0;
  let productsSelected = [];
  let products = await cart.getProducts();
  for (let i = 0; i < products.length; i++) {
    TotalCost = TotalCost + products[i].cost;
    productsSelected.push({
      id: products[i].id,
      name: products[i].name,
      cost: products[i].cost,
    });
  }

  res.status(200).json({
    id: cart.id,
    productsSelected,
    TotalCost,
  });
};

module.exports = {
  createCart,
  updateCart,
  getCart,
};
