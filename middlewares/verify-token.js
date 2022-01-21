const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.get('Authorization');
  let decodedToken;

  if (!authHeader) {
    const error = new Error('Token is not valid');
    error.message = 'Token is not valid';
    error.statusCode = 403;
    throw error;
  }

  try {
    const token = authHeader.split(' ')[1];
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    error.message = 'Token is not valid';
    next(error);
  }

  if (decodedToken === null) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }

  req.user = decodedToken;
  next();
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user._id === req.params.id) {
      next();
    } else {
      const error = new Error('You are not allowed to do that!');
      error.statusCode = 403;
      throw error;
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user) {
      const error = new Error('You are not allowed to do that!');
      error.statusCode = 403;
      throw error;
    }
    if (req.user.isAdmin) {
      next();
    } else {
      const error = new Error('You are not allowed to do that!');
      error.statusCode = 403;
      throw error;
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin };
