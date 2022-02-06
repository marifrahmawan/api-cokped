const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: {
      products: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
          },
          price: {
            type: Number,
          },
          quantity: {
            type: Number,
            default: 0,
          },
          colorChoice: {
            type: String,
          },
          sizeChoice: {
            type: String,
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
    wishlist: [],
    order: [],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
