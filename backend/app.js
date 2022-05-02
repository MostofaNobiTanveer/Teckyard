const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');

const errorMiddleware = require('./middlewares/errors');

// setting up the environment variables
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').dotenv.config({ path: 'backend/config/config.env' });
}

app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(fileUpload());

// import all the routes
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const paymentRoutes = require('./routes/payment');

app.use('/api/v1', productRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', paymentRoutes);

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
}

// middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
