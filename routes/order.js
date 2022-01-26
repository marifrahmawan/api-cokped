const router = require('express').Router();
const OrderController = require('../controllers/Order');
const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require('../middlewares/verify-token');

router.get('/', verifyTokenAndAdmin, OrderController.index);
router.get('/find/:userId', verifyTokenAndAuth, OrderController.findOrder);
router.post('/', verifyTokenAndAuth, OrderController.createOrder);
router.put('/:id', verifyTokenAndAdmin, OrderController.updateOrder);
router.delete('/:id', verifyTokenAndAdmin, OrderController.deleteOrder);
router.get('/income', verifyToken, OrderController.income);

module.exports = router;
