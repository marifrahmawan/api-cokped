const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const axios = require('axios');
const encBase64 = require('crypto-js/enc-base64');

// router.post('/payment', (req, res) => {
//   stripe.charges.create(
//     {
//       source: req.body.tokenId,
//       amount: req.body.amount,
//       currency: 'usd',
//     },
//     (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         res.status(500).json(stripeErr);
//       } else {
//         res.status(200).json(stripeRes);
//       }
//     }
//   );
// });

// router.post('/payment', async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           name: 'nike shirt',
//           currency: 'usd',
//           quantity: req.body.quantity,
//           amount: req.body.amount,
//         },
//       ],
//       mode: 'payment',
//       success_url: 'http://localhost:3000/success',
//       cancel_url: 'http://localhost:3000/cancel',
//     });

//     console.log(session);

//     res.json({ url: session.url });
//   } catch (error) {
//     console.log(error);
//   }
// });

router.post('/payment', async (req, res) => {
  const SERVER_KEY = 'SB-Mid-server-MxzLVvQdUz72-be8nD11IttB';
  const SANDBOX_URL = 'https://api.sandbox.midtrans.com/v2/charge';
  const PRODUCTION_URL = 'https://api.midtrans.com/v2/charge';
  const AUTH_KEY = Buffer.from(SERVER_KEY).toString('base64');

  try {
    const response = await axios.post(
      SANDBOX_URL,
      {
        payment_type: 'bank_transfer',
        transaction_details: {
          order_id: 'order-231222',
          gross_amount: 225921,
        },
        bank_transfer: {
          bank: 'bca',
        },
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization:
            'Basic U0ItTWlkLXNlcnZlci1NeHpMVnZRZFV6NzItYmU4bkQxMUl0dEI6',
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(response.data);
    return res.json({ data: response.data });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
