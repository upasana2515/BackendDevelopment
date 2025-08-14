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
const app = express();  
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Blog = require('./models/blog');
const User = require('./models/user');

// create
app.post("/blogs", async(req,res)=>{
    let title = req.body.title;
    let body = req.body.body;
    let userId = req.body.userId; 
    let blog = {
        title : title,
        body : body,
        date : Date.now(),
        userId: userId
    }
    let newBlog = new Blog(blog) 
    await newBlog.save()
    let user = await User.findById(userId);
    user.blogs.push(newBlog._id);
    await user.save();
    res.json({
        success : true,
        message : "blog added successfully",
        data : newBlog
    })
})

// read
// read all data
app.get("/blogs",async (req,res)=>{
    let allBlogs = await Blog.find();
    res.json({
        success : true,
        message : "all data fetched successfully",
        data : allBlogs
    })
})
// read single data
app.get("/blogs/:id",async (req,res)=>{
    let id = req.params.id;
    let blog = await Blog.findById(id); 
    res.json({
        success : true,
        message : "blog fetched successfully",
        data : blog
    })
})



// create user
app.post("/users", async (req,res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let user = {
        name : name,
        email : email,
        password : password
    }
    let newUser = new User(user)
    await newUser.save()
    res.json({
        success : true,
        message : "user added successfully",
        data : newUser
    })
})

// read
// read all users
app.get("/users", async (req,res)=>{
    let allUsers = await User.find();
    res.json({
        success : true,
        message : "all users fetched successfully",
        data : allUsers
    })
})

// read single user
app.get("/users/:id", async(req,res)=>{
    let id = req.params.id;
    let user = await User.findById(id);
    res.json({
        success : true,
        message : "user fetched successfully",
        data : user
    })
})

mongoose.connect('mongodb://127.0.0.1:27017/G27DBs')
  .then(() => console.log('Connected!'));

app.listen(5556, () => {
    console.log(`Server is running on http://localhost:5556`);
});