import axios from "axios";

const apiURL = "http://localhost:3000/api/blogs";

// Get all blogs

export const fetchBlogs = async () => {
  const res = await axios.get(apiURL + "/get");
  return res.data.data;
};

// Get single blog by ID

// Add a new blog

export const addBlog = async (newData) => {
  const res = await axios.post(apiURL + "/add", newData);
  return res.data.data;
};

// Update a blog

export const updateBlog = async (id, updateBlog) => {
  const res = await axios.put(apiURL + `/update/${id}`, updateBlog);
  return res.data.data;
};

// Delete a blog

export const deleteBlog = async (id) => {
  const res = await axios.delete(apiURL + `/delete/${id}`);
  return res.data.data;
};
