const router = require("express").Router();
const CartController = require("../controllers/Cart");
const { verifyTokenAndAuth } = require("../middlewares/verify-token");

router.get("/:userId", verifyTokenAndAuth, CartController.findCart);
router.put("/:userId", verifyTokenAndAuth, CartController.updateCart);
router.put(
  "/remove-cart-product/:userId",
  verifyTokenAndAuth,
  CartController.removeFromCart
);

module.exports = router;
