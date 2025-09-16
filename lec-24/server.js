// const express = require("express");
// const mongoose = require("mongoose");
// app.use(express.static("public"));

// const authRoutes = require("./routes/authRoutes");
// const blogRoutes = require("./routes/blogRoutes");
// const userRoutes = require("./routes/userRoutes");

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use("/auth", authRoutes);
// app.use("/blogs", blogRoutes);
// app.use("/users", userRoutes);

// mongoose.connect("mongodb://127.0.0.1:27017/G27DBs")
//   .then(() => console.log("Connected to MongoDB"))
//   .catch(err => console.log(err));

// app.listen(5556, () => console.log("Server running on http://localhost:5556"));

const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (public folder)
app.use(express.static("public"));

// Routes
app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);
app.use("/users", userRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/G27DBs")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.listen(5556, () => console.log("Server running on http://localhost:5556"));
