const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const isLogin = require("../middleware/auth");

// Blog routes
router.post("/blogs", isLogin, blogController.createBlog);
router.delete("/blogs/:blogId", isLogin, blogController.deleteBlog);
router.get("/blogs", blogController.getAllBlogs);
router.get("/blogs/:id", blogController.getBlogById);

module.exports = router;
