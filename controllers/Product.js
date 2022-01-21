const Product = require('../models/Product');

exports.index = async (req, res, next) => {
  try {
    const product = await Product.find();

    res.status(200).json(product);
  } catch (error) {
    throw error;
  }
};

exports.findProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(500).json(product);
  } catch (error) {
    throw error;
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { title, desc, img, categories, size, color, price } = req.body;
    const newProduct = new Product({
      title,
      desc,
      img,
      categories,
      size,
      color,
      price,
    });

    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (error) {
    error.message = 'Something went wrong!';
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    throw error;
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json('Product deleted');
  } catch (error) {
    throw error;
  }
};
