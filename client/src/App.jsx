import React, { useState, useEffect } from "react";
import "./App.css";
import { fetchBlogs, addBlog, updateBlog, deleteBlog } from "./blogApi";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [name, setName] = useState("");
  const [blog, setBlog] = useState("");
  const [editingId, setEditingId] = useState(null); // Track which blog is being edited
  const [editName, setEditName] = useState("");
  const [editBlog, setEditBlog] = useState("");

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
      const data = await fetchBlogs();
      setBlogs(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (b) => {
    setEditingId(b._id);
    setEditName(b.name);
    setEditBlog(b.blog);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateBlog(editingId, { name: editName, blog: editBlog });
      setEditingId(null);
      setEditName("");
      setEditBlog("");
      const data = await fetchBlogs();
      setBlogs(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditName("");
    setEditBlog("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(id);
        const data = await fetchBlogs();
        setBlogs(data || []);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>My Blog</h1>

      {/* Add Blog Form */}
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
            {editingId === b._id ? (
              // Edit Form
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                />
                <br />
                <br />
                <textarea
                  value={editBlog}
                  onChange={(e) => setEditBlog(e.target.value)}
                  required
                ></textarea>
                <br />
                <br />
                <button type="submit">Update</button>
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <div>
                  <button onClick={() => handleEdit(b)}>
                    <img src="/assets/edit.svg" alt="Edit" />
                  </button>
                  <button onClick={() => handleDelete(b._id)}>
                    <img src="/assets/delete.svg" alt="Delete" />
                  </button>
                </div>

                <h3>{b.name}</h3>
                <p>{b.blog}</p>
                <small>{new Date(b.createdAt).toLocaleString()}</small>
              </>
            )}
          </div>
        ))}
    </div>
  );
}

export default App;
