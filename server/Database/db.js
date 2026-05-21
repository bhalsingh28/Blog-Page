const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/blogPage");
    console.log("Mongoose connected!!");
  } catch (err) {
    console.log("Could not connect to the database", err);
  }
};

module.exports = connectToDb;
