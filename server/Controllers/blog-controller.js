const Blogs = require("../Models/blog.js");

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
    const blog = await Blogs.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id, // from jwt token
    });
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
    const blog = await Blogs.findById(req.params.id);

    if (!blog) {
      res.status(404).json({
        message: "Blog not found",
      });
    }
    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    await blog.save();
    res.json(blog);
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
