const router = require('express').Router();
const ProductController = require('../controllers/Product');
const { verifyTokenAndAdmin } = require('../middlewares/verify-token');

router.get('/', ProductController.index);
router.get('/:id', ProductController.findProduct);

//* ONLY ADMIN
router.post('/', verifyTokenAndAdmin, ProductController.createProduct);
router.put('/:id', verifyTokenAndAdmin, ProductController.updateProduct);
router.delete('/:id', verifyTokenAndAdmin, ProductController.deleteProduct);

module.exports = router;
