const express = require("express");
const mongoose = require('mongoose');
const app = express();
const Blog = require("./model/blog");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//create
app.post("/blog", async(req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    let blog = {
        title:title,
        body:body,
        date: Date.now()
    }

    let newBlog = new Blog(blog)
    await newBlog.save()
    res.json({
        sucess:true,
        message:"Blog added successfully",
        data:newBlog
    })

})
//read
//read all data
//read single data
app.get("/blog",async(req,res)=>{
    let allBlogs =await Blog.find();
    res.json({
        success:true,
        message:"All blogs fetched successfully",
        data:allBlogs
    })
})

app.get("/blog/:id",async(req,res)=>{
    let id = req.params.id;
    let blog = await Blog.findById(id);
    res.json({
        success:true,
        message:"Blog fetched successfully",
        data:blog
    })
})


mongoose.connect("mongodb://127.0.0.1:27017/g27db")
.then(() => {
    console.log("Connected to MongoDB");
});

app.listen(5556,()=>{
    console.log("Server is running on port 5556");
})
