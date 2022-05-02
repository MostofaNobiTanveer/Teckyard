const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  shippingInfo: {
    address: {
      type: String,
      required: [true, 'Shipping address is required'],
    },
    city: {
      type: String,
      required: [true, 'Shipping city is required'],
    },
    phoneNo: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    postalCode: {
      type: String,
      required: [true, 'Postal code is required'],
    },
    state: {
      type: String,
      required: [true, 'State is required'],
    },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: 'processing',
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
