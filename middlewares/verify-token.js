const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.get('Authorization');
  let decodedToken;

  if (!authHeader) {
    const error = new Error('Token is not valid');
    error.statusCode = 403;
  }

  const token = authHeader.split(' ')[1];
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    throw error;
  }

  if (!decodedToken) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }

  req.user = decodedToken;
  next();
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user._id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      const error = new Error('You are not allowed to do that!');
      error.statusCode = 403;
      throw error;
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuth };
