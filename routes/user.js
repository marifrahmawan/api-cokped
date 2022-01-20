const router = require('express').Router();
const UserController = require('../controllers/User');
const {
  verifyToken,
  verifyTokenAndAuth,
} = require('../middlewares/verify-token');

router.put('/:id', verifyTokenAndAuth, UserController.update);

module.exports = router;
