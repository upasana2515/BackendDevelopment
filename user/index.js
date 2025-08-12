const express = require("express");
const mongoose = require("mongoose");
const Data = require("./userModel/Data");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CREATE
app.post("/data", async (req, res) => {
    try {
        const userData = new Data({
            username: req.body.username,
            password: req.body.password
        });
        await userData.save();
        res.json({
            success: true,
            message: "User added successfully",
            data: userData
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// READ ALL
app.get("/data", async (req, res) => {
    try {
        const allData = await Data.find();
        res.json({
            success: true,
            message: "All data fetched successfully",
            data: allData
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// READ SINGLE
app.get("/data/:id", async (req, res) => {
    try {
        const singleData = await Data.findById(req.params.id);
        if (!singleData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({
            success: true,
            message: "User fetched successfully",
            data: singleData
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

mongoose.connect("mongodb://127.0.0.1:27017/g27db")
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

app.listen(5556, () => {
    console.log(" Server is running on port 5556");
});
