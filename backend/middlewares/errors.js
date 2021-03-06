const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === 'PRODUCTION') {
    let error = { ...err };
    error.message = err.message;

    // Handle wrong Mongoose ObjectId error
    if (err.name === 'CastError') {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    // Handle Mongoose validation error
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new ErrorHandler(message, 400);
    }

    // Handle Mongoose duplicate key error
    if (err.code === 11000) {
      const message = `Duplicate field value: ${err.keyValue.name}`;
      error = new ErrorHandler(message, 400);
    }

    // Handle JWT authentication error
    if (err.name === 'JsonWebTokenError') {
      const message = 'Invalid token';
      error = new ErrorHandler(message, 400);
    }

    // Handle JWT decode error
    if (err.name === 'TokenExpiredError') {
      const message = 'Token expired';
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      error: error.message || 'Something went wrong',
    });
  }
};
