const router = require('express').Router();
const CartController = require('../controllers/Cart');
const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require('../middlewares/verify-token');

router.get('/find/:userId', verifyTokenAndAuth, CartController.findCart);
router.post('/', verifyToken, CartController.createCart);
router.put('/:id', verifyTokenAndAuth, CartController.updateCart);
router.delete('/:id', verifyTokenAndAuth, CartController.deleteCart);

//* ONLY ADMIN
router.get('/', verifyTokenAndAdmin, CartController.index);

module.exports = router;
