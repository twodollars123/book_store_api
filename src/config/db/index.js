const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/book_store_db");
    console.log("Connected!!");
  } catch (error) {
    console.log("Failure");
  }
};

module.exports = { connect };
