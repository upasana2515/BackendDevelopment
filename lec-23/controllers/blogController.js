const Blog = require("../models/blog");
const User = require("../models/user");

// create blog
exports.createBlog = async (req, res) => {
    let { title, body } = req.body;
    let userId = req.userId;

    let user = await User.findById(userId);
    if (!user) return res.json({ success: false, message: "Invalid User" });

    let newBlog = new Blog({ title, body, date: Date.now(), userId });
    await newBlog.save();

    user.blogs.push(newBlog._id);
    await user.save();

    res.json({ success: true, message: "blog added successfully", data: newBlog });
};

// delete blog
exports.deleteBlog = async (req, res) => {
    let blogId = req.params.blogId;
    let userId = req.userId;

    let blogExist = await Blog.findById(blogId);
    if (!blogExist) return res.json({ success: false, message: "Blog not found" });

    if (blogExist.userId.toString() !== userId) {
        return res.json({ success: false, message: "You are not authorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(blogId);
    res.json({ success: true, message: "Blog deleted successfully" });
};

// get all blogs
exports.getAllBlogs = async (req, res) => {
    let allBlogs = await Blog.find();
    res.json({ success: true, message: "all data fetched successfully", data: allBlogs });
};

// get single blog
exports.getBlogById = async (req, res) => {
    let blog = await Blog.findById(req.params.id);
    res.json({ success: true, message: "blog fetched successfully", data: blog });
};
