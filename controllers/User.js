const User = require('../models/User');
const CryptoJS = require('crypto-js');

exports.index = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    error.message = `Can't find User`;
    error.statusCode = 500;
    throw error;
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    error.message = `Can't find User`;
    error.statusCode = 500;
    throw error;
  }
};

exports.update = async (req, res, next) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

exports.delete = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json('User deleted');
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};
