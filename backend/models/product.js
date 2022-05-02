const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Name must be less than 100 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    maxlength: [5, 'Price must be less than 5 characters'],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: {
      values: ['Keyboard', 'Mouse', 'Mousepad', 'Headphones'],
      message: 'Category is invalid',
    },
  },
  stock: {
    type: Number,
    required: [true, 'Product stock is required'],
    maxlength: [5, 'Stock must be less than 5 characters'],
    default: 0,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
