const express = require("express");
const Blog = require("../models/blog");   
const User = require("../models/user"); 
// let blogController = require("../controller/blogController");
// let postAddBlog = blogController.postAddBlog;
// let deleteOneBlog = blogController.deleteOneBlog;
// let getAllBlog = blogController.getAllBlog;
// let getOneBlog = blogController.getOneBlog;

const { postAddBlog, deleteOneBlog, getAllBlogs, getOneBlog } = require("../controller/blogController");

const router = express.Router();

// Create blog
router.post("/", postAddBlog);

// Delete blog
router.delete("/:blogId", deleteOneBlog);

// Get all blogs
router.get("/", getAllBlogs);

// Get single blog
router.get("/:id", getOneBlog);

module.exports = router;
