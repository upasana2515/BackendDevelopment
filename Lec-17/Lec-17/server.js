const express = require('express');
const mongoose = require('mongoose');
const app = express();  
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Blog = require('./model/blog');
const User=require("./model/user");

// create
// app.post("/blogs", async(req,res)=>{
//     let title = req.body.title;
//     let body = req.body.body;
//     let blog = {
//         title : title,
//         body : body,
//         date : Date.now()
//     }
//     let newBlog = new Blog(blog) 
//     await newBlog.save()
//     res.json({
//         success : true,
//         message : "blog added successfully",
//         data : newBlog
//     })
// })

//read
//read all data
//read single data
// app.get("/blogs",async(req,res)=>{
//     let allBlogs=await Blog.find();
//     res.json({
//         success:true,
//         message:"all data fetched successfully",
//         data:allBlogs
//     })
// })

// app.get("/blogs/:id",async(req,res)=>{
//     let id=req.params.id;
//     let blog=await Blog.findById(id)
//     res.json({
//         success:true,
//         message:"blog fetched successfully",
//         data:blog
//     })
// })


//for users
//create
app.post("/user", async(req,res)=>{
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let user = {
        username : username,
        email:email,
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

//read
app.get("/user",async(req,res)=>{
    let alluser=await User.find();
    res.json({
        success:true,
        message:"all users fetched successfully",
        data:alluser
    })
})

app.get("/user/:id",async(req,res)=>{
    let id=req.params.id;
    let user=await User.findById(id)
    res.json({
        success:true,
        message:"user fetched successfully",
        data:user
    })
})



mongoose.connect('mongodb://127.0.0.1:27017/G27DBs')
  .then(() => console.log('Connected!'));

app.listen(5556, () => {
    console.log("Server is running on http://localhost:5556");
});