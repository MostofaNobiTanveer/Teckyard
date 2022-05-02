const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDB = require('../config/database');

const products = require('../data/products');

// Setting up dotenv
dotenv.config({ path: 'backend/config/config.env' });

// Connect to database
connectDB();

// Seed products
const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log('Products Deleted');

    await Product.insertMany(products);
    console.log('Products added to database');

    process.exit();
  } catch (err) {
    console.error(err.message);
    process.exit();
  }
};

seedProducts();
