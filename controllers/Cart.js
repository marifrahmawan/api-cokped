const Cart = require('../models/Cart');

exports.index = async (req, res, next) => {
  try {
    const userCarts = await Cart.find();

    res.status(200).json(userCarts);
  } catch (error) {
    throw error;
  }
};

exports.findCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    res.status(500).json(cart);
  } catch (error) {
    throw error;
  }
};

exports.createCart = async (req, res, next) => {
  try {
    const newCart = new Cart(req.body);

    await newCart.save();
    res.status(200).json(newCart);
  } catch (error) {
    error.message = 'Something went wrong!';
    next(error);
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedCart);
  } catch (error) {
    throw error;
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json('Cart deleted');
  } catch (error) {
    throw error;
  }
};
