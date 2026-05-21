const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlog,
  addBlog,
  updateBlog,
  deleteBlog,
} = require("../Controllers/blog-controller");
const authMiddleware = require("../Middlewares/auth-middleware");

router.get("/get", getAllBlogs);
router.get("/get/:id", getBlog);
router.post("/add", authMiddleware, addBlog);
router.put("/update/:id", authMiddleware, updateBlog);
router.delete("/delete/:id", deleteBlog);

module.exports = router;
