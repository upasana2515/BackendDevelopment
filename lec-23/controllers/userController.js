const User = require("../models/user");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_secret_key"; 

// signup
exports.signup = async (req, res) => {
    let { name, email, password } = req.body;
    let newUser = new User({ name, email, password });
    await newUser.save();
    res.json({
        success: true,
        message: "user added successfully",
        data: newUser
    });
};

// login
exports.login = async (req, res) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email, password });
    if (!user) {
        return res.json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ success: true, message: "Login successful", token });
};

// get all users
exports.getAllUsers = async (req, res) => {
    let allUsers = await User.find();
    res.json({ success: true, message: "all users fetched successfully", data: allUsers });
};

// get single user
exports.getUserById = async (req, res) => {
    let user = await User.findById(req.params.id);
    res.json({ success: true, message: "user fetched successfully", data: user });
};
