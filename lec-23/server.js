const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use(authRoutes);
app.use(userRoutes);
app.use(blogRoutes);

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/G27DBs")
  .then(() => console.log("Connected!"))
  .catch(err => console.log("DB Error:", err));

app.listen(5556, () => {
    console.log(`Server is running on http://localhost:5556`);
});
