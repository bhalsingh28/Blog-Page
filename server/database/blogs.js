const mongoose = require("mongoose");
require("dotenv").config();
const blogDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/blogAPI");
    console.log("Database Connected");
  } catch (err) {
    console.log("Failed to connect to the Database...", err);
  }
};

module.exports = blogDB;
