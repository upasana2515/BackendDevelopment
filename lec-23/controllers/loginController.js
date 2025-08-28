const User = require("../models/user");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_secret_key"; 

// login
exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;
        console.log("Login attempt with:", email, password);

        // check if email exists
        let user = await User.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "Email not registered"
            });
        }

        // check password
        if (user.password !== password) {
            return res.json({
                success: false,
                message: "Wrong password"
            });
        }

        // generate token
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            success: true,
            message: "Login successful",
            token
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
