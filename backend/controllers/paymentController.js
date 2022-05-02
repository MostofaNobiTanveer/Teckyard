const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Process payment   =>   POST  /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'usd',

    metadata: { integration_check: 'accept_a_payment' },
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

// Send stripe API key   =>   GET  /api/v1/stripe/key
exports.sendSTripeKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
