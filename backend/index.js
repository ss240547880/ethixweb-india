require('dotenv').config(); // .env file ko load karne ke liye
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connection Successful!");
    app.listen(PORT, () => {
      console.log(`Server is running on Port ${PORT}.`);
    });
  })
  .catch((error) => {
    console.error("Database connection mein error:", error);
  });