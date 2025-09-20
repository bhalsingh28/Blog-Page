const express = require("express");
const {
  getAllBlogs,
  getBlog,
  addBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog-controller.js");

const router = express.Router();

router.get("/get", getAllBlogs); // Get all blogs
router.get("/get/:id", getBlog); // Get a blog by ID
router.post("/add", addBlog); // Add a blog
router.put("/update/:id", updateBlog); // Update a blog
router.delete("/delete/:id", deleteBlog); // Delete a blog

module.exports = router;
