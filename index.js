require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');

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

    //* API ENDPOINT
    app.use('/api/auth', authRoute);
    app.use('/api/users', userRoute);
    app.use('/api/products', productRoute);
    app.use('/api/cart', cartRoute);
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
