const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxLength: [30, "Name cannot be more than 30 characters"],
  },
  blog: {
    type: String,
    required: [true, "Blog is required"],
    trim: true,
    minLength: [10, "Blog cannot be less than 10 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Blog", BlogSchema);
