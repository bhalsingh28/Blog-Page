const express = require("express");
const blogDB = require("./server/database/blogs");
const blogRoutes = require("./server/routes/blogRoutes");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware
blogDB(); // DB connection
app.use("/api/blogs", blogRoutes); // Routes Connection

app.listen(PORT, () => {
  console.log("Server Running...");
});
