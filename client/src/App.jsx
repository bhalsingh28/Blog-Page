import React, { useState, useEffect } from "react";
import "./App.css";
import { fetchBlogs, addBlog } from "./blogApi";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [name, setName] = useState("");
  const [blog, setBlog] = useState("");
  const editIcon = "/edit.svg";
  const deleteIcon = "/delete.svg";

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs();
        setBlogs(data || []);
      } catch (err) {
        console.error(err);
      }
    };
    loadBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBlog({ name, blog });
      setName("");
      setBlog("");
      const data = await fetchBlogs(); // reload blogs
      setBlogs(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (e) => {};

  const handleDelete = async (e) => {};

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
            <div>
              <button onClick={handleEdit}>
                <img src="/assets/edit.svg" alt="Edit" />
              </button>
              <button onClick={handleDelete}>
                <img src="/assets/delete.svg" alt="Delete" />
              </button>
            </div>

            <h3>{b.name}</h3>
            <p>{b.blog}</p>
            <small>{new Date(b.createdAt).toLocaleString()}</small>
          </div>
        ))}
    </div>
  );
}

export default App;
