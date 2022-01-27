require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');
const cors = require('cors');

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('CONNECTED TO DATABASE');
    app.listen(process.env.PORT, () => {
      console.log(`listening on http://localhost:${process.env.PORT}`);
    });

    app.use(cors());
    app.use(express.json());
    //* API ENDPOINT
    app.use('/api/auth', authRoute);
    app.use('/api/users', userRoute);
    app.use('/api/products', productRoute);
    app.use('/api/carts', cartRoute);
    app.use('/api/orders', orderRoute);
    app.use('/api/checkout', stripeRoute);

    //* ERROR HANDLER
    app.use((error, req, res, next) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }

      const errorMessage = error.message;
      res
        .status(error.statusCode)
        .json({ message: 'Something went wrong!', error: errorMessage });
    });
  })
  .catch((e) => {
    console.log(e);
  });
