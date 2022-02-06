const User = require("../models/User");

exports.findCart = async (req, res, next) => {
  try {
    const cart = await User.findById(req.params.userId).populate(
      "cart.products.productId"
    );

    res.status(200).json(cart);
  } catch (error) {
    throw error;
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    const updatedCart = await User.findByIdAndUpdate(
      req.params.userId,
      {
        cart: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedCart);
  } catch (error) {
    throw error;
  }
};

exports.removeFromCart = async (req, res, next) => {
  const { cartProductId } = req.body;
  let updatedUserCart;

  const userCart = await User.findById(req.params.userId);

  updatedUserCart = userCart.cart.products.filter(
    (item) => item?._id.toString() !== cartProductId?.toString()
  );

  const newUserCart = await User.findByIdAndUpdate(
    req.params.userId,
    {
      cart: updatedUserCart,
    },
    {
      new: true,
    }
  );

  try {
    res.status(200).json(newUserCart);
  } catch (error) {
    throw error;
  }
};
