const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        price: {
          type: Number,
        },
        quantity: {
          type: Number,
          default: 0,
        },
      },
    ],
    totalQuantity: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', CartSchema);
