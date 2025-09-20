const Blogs = require("../models/Blog.js");

const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blogs.find({});
    if (allBlogs.length > 0) {
      res.status(200).json({
        success: true,
        message: "All Blogs Fetched Successfully",
        data: allBlogs,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Blogs not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Could not get all Blogs",
    });
  }
};

const getBlog = async (req, res) => {
  const blogById = await Blogs.findById(req.params.id);
  try {
    if (blogById) {
      res.status(200).json({
        success: true,
        message: "Blog Fetched Successfully",
        data: blogById,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Blogs not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Could not get Blog",
    });
  }
};

const addBlog = async (req, res) => {
  try {
    const blogData = req.body;
    const newBlog = await Blogs.create(blogData);
    if (newBlog) {
      res.status(200).json({
        success: true,
        message: "Blog added Successfully",
        data: newBlog,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Could not add blog",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Could not add Blog",
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const updatedBlogData = req.body;
    const updatedBlog = await Blogs.findByIdAndUpdate(
      req.params.id,
      updatedBlogData,
      { new: true }
    );
    if (updateBlog) {
      res.status(200).json({
        success: true,
        message: "Blog updated Successfully",
        data: updateBlog,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Could not update blog",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Could not update Blog",
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const deletedBook = await Blogs.findByIdAndDelete(req.params.id);
    if (deleteBlog) {
      res.status(200).json({
        success: true,
        message: "Blog deleted Successfully",
        data: deleteBlog,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Could not update blog",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Could not update Blog",
    });
  }
};

module.exports = { getAllBlogs, getBlog, addBlog, updateBlog, deleteBlog };
