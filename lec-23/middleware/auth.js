const jwt = require("jsonwebtoken");
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
        req.userId = decoded.userId;
        next();
    });
};

module.exports = isLogin;
