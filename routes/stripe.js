const router = require('express').Router();

const stripe = require('stripe')(process.env.STRIPE_KEY);

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

router.post('/payment', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          name: 'nike shirt',
          currency: 'usd',
          quantity: req.body.quantity,
          amount: req.body.amount,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    console.log(session);

    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
