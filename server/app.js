const express = require("express");
const blogDB = require("./database/blogs");
const blogRoutes = require("./routes/blogRoutes");
const app = express();
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Middleware
blogDB(); // DB connection
app.use("/api/blogs", blogRoutes); // Routes Connection

app.listen(PORT, () => {
  console.log("Server Running...");
});
