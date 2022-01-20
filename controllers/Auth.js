const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//* REGISTER
exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username: username,
      email: email,
      password: CryptoJS.AES.encrypt(
        password,
        process.env.PASS_SECRET
      ).toString(),
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

//* LOGIN
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(401).json('Wrong Credentials');
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET
    ).toString(CryptoJS.enc.Utf8);

    if (password !== hashedPassword) {
      return res.status(401).json('Wrong Credentials');
    }

    const accessToken = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: '3d' }
    );

    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      accessToken,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
