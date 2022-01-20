require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const userRoute = require('./routes/user');

app.use(express.json());

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

    /*
     * API ENDPOINT
     */
    app.use('/api/users', userRoute);
  })
  .catch((e) => {
    console.log(e);
  });
