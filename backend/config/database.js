const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose
    .connect(process.env.DB_URI, {
      autoIndex: false,
    })
    .then((con) => {
      console.log(`MongoDB connected with HOST: ${con.connection.host}`);
    });
};

module.exports = connectDB;
