const express = require('express');
const router = express.Router();

const {
  processPayment,
  sendSTripeKey,
} = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/payment/process').post(isAuthenticatedUser, processPayment);
router.route('/stripe/key').get(isAuthenticatedUser, sendSTripeKey);

module.exports = router;
