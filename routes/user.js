const router = require('express').Router();
const UserController = require('../controllers/User');
const {
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require('../middlewares/verify-token');

router.get('/', verifyTokenAndAdmin, UserController.index);
router.get('/find/:id', verifyTokenAndAdmin, UserController.getUser);
router.put('/:id', verifyTokenAndAuth, UserController.update);
router.delete('/:id', verifyTokenAndAdmin, UserController.delete);
router.get('/stats', verifyTokenAndAdmin, UserController.userStats);

module.exports = router;
