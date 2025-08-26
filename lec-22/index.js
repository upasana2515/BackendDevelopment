// const express = require("express");
// const mongoose = require('mongoose');
// const app = express();
// const Blog = require("./model/blog");
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// //create
// app.post("/blog", async(req, res) => {
//     let title = req.body.title;
//     let body = req.body.body;
//     let blog = {
//         title:title,
//         body:body,
//         date: Date.now()
//     }

//     let newBlog = new Blog(blog)
//     await newBlog.save()
//     res.json({
//         sucess:true,
//         message:"Blog added successfully",
//         data:newBlog
//     })

// })
// //read
// //read all data
// //read single data
// app.get("/blog",async(req,res)=>{
//     let allBlogs =await Blog.find();
//     res.json({
//         success:true,
//         message:"All blogs fetched successfully",
//         data:allBlogs
//     })
// })

// app.get("/blog/:id",async(req,res)=>{
//     let id = req.params.id;
//     let blog = await Blog.findById(id);
//     res.json({
//         success:true,
//         message:"Blog fetched successfully",
//         data:blog
//     })
// })


// mongoose.connect("mongodb://127.0.0.1:27017/g27db")
// .then(() => {
//     console.log("Connected to MongoDB");
// });

// app.listen(5556,()=>{
//     console.log("Server is running on port 5556");
// })
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Blog = require('./models/blog');
const User = require('./models/user');

const JWT_SECRET = "your_secret_key"; 

const isLogin = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.json({ success: false, message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.json({ success: false, message: "Invalid token format" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.json({ success: false, message: "Invalid or expired token" });
        }
        req.userId = decoded.userId; // ✅ attach userId to req
        next();
    });
};

// user signup
app.post("/users", async (req,res)=>{
    let { name, email, password } = req.body;
    let user = { name, email, password };
    let newUser = new User(user);
    await newUser.save();
    res.json({
        success : true,
        message : "user added successfully",
        data : newUser
    });
});
//jwt
app.post("/login", async (req,res)=>{
    let { email, password } = req.body;
    let user = await User.findOne({ email, password });
    if (!user) {
        return res.json({
            success: false,
            message: "Invalid email or password"
        });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({
        success: true,
        message: "Login successful",
        token
    });
});
// create blog
app.post("/blogs", isLogin, async(req,res)=>{
    let { title, body } = req.body;
    let userId = req.userId;  // from token

    let user = await User.findById(userId);
    if (!user) {
        return res.json({
            success: false,
            message: "Invalid User"
        });
    }
    let blog = { title, body, date: Date.now(), userId };
    let newBlog = new Blog(blog);
    await newBlog.save();

    user.blogs.push(newBlog._id);
    await user.save();

    res.json({
        success : true,
        message : "blog added successfully",
        data : newBlog
    });
});
// delete blog (protected)
app.delete("/blogs/:blogId", isLogin, async (req, res) => {
    let blogId = req.params.blogId; 
    let userId = req.userId;
    let blogExist = await Blog.findById(blogId);

    if (!blogExist) {
        return res.json({ success: false, message: "Blog not found" });
    }
    if (blogExist.userId.toString() !== userId) {
        return res.json({ success: false, message: "You are not authorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(blogId);
    res.json({ success: true, message: "Blog deleted successfully" });
});    

// read all blogs
app.get("/blogs",async (req,res)=>{
    let allBlogs = await Blog.find();
    res.json({
        success : true,
        message : "all data fetched successfully",
        data : allBlogs
    });
});

// read single blog
app.get("/blogs/:id",async (req,res)=>{
    let id = req.params.id;
    let blog = await Blog.findById(id); 
    res.json({
        success : true,
        message : "blog fetched successfully",
        data : blog
    });
});

// read all users
app.get("/users", async (req,res)=>{
    let allUsers = await User.find();
    res.json({
        success : true,
        message : "all users fetched successfully",
        data : allUsers
    });
});

// read single user
app.get("/users/:id", async(req,res)=>{
    let id = req.params.id;
    let user = await User.findById(id);
    res.json({
        success : true,
        message : "user fetched successfully",
        data : user
    });
});

mongoose.connect('mongodb://127.0.0.1:27017/G27DBs')
  .then(() => console.log('Connected!'));

app.listen(5556, () => {
    console.log(`Server is running on http://localhost:5556`);
});
