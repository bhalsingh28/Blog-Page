const express = require("express");
const app = express();
const connectToDb = require("./Database/db.js");
const authRoutes = require("./Routers/auth-route.js");
const blogRoutes = require("./Routers/blog-route.js");

require("dotenv").config();
connectToDb();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

app.listen(4000, () => {
  console.log("Server running on PORT", 4000);
});
