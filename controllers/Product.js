const Product = require('../models/Product');

exports.index = async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(10);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else if (qNew && qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      })
        .sort({ createdAt: -1 })
        .limit(5);
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    throw error;
  }
};

exports.findProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (error) {
    throw error;
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { title, desc, img, categories, size, color, price, instock } =
      req.body;
    const newProduct = new Product({
      title,
      desc,
      img,
      categories,
      size,
      color,
      price,
      instock,
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
