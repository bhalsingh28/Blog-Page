import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [name, setName] = useState("");
  const [blog, setBlog] = useState("");

  const apiURL = "http://localhost:3000/api/blogs";

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(apiURL + "/get");
      console.log("API Response:", res.data);

      // If your backend sends { blogs: [...] }
      setBlogs(res.data.data || []);

      // If backend sends array directly, just do:
      // setBlogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(apiURL + "/add", { name, blog });
      setName("");
      setBlog("");
      fetchBlogs(); // Reload Blogs
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div style={{ margin: "20px" }}>
      <h1>My Blog</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <br />
        <textarea
          placeholder="Write your blog..."
          value={blog}
          onChange={(e) => setBlog(e.target.value)}
          required
        ></textarea>
        <br />
        <br />
        <button type="submit">Post Blog</button>
      </form>

      <h2>All Blogs</h2>
      {Array.isArray(blogs) &&
        blogs.map((b) => (
          <div
            key={b._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{b.name}</h3>
            <p>{b.blog}</p>
            <small>{new Date(b.createdAt).toLocaleString()}</small>
          </div>
        ))}
    </div>
  );
}

export default App;
