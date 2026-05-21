const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  author: {
    // Connects auth + blogs
    type: mongoose.Schema.Types.ObjectId,
    trim: true,
    ref: "User",
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  content: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = mongoose.model("Blogs", blogSchema);
