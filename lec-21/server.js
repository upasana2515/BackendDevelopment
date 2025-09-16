// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const User = require("./models/users")
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }))
// console.log(User)

// const jwt = require("jsonwebtoken");

// app.get("/health", (req, res) => {
//     res.json({
//         status: "ok",
//         message: "server running ok"
//     })
// })

// app.get("/home",(req,res)=>{
//     res.json({
//         success:true,
//         message:"welcome"
//     })
// })
// //end-point for signup---adding new user into database
// app.post("/api/users/signup", async (req, res) => {
//     try {
//         let { name, email, password } = req.body;
//         let userExist = await User.findOne({ email: email })
//         if (userExist) {
//             return res.json({
//                 success: false,
//                 message: "user already exist with this email please login"
//             })
//         }
//         let newUser = new User({
//             name: name,
//             email: email,
//             password: password
//         })
//         await newUser.save()
//         res.json({
//             success: true,
//             message: "user registered successfully, please login to continue"
//         })
//     } catch (error) {
//         console.log(error.message);
//         res.json({
//             error: {
//                 message: error.message
//             }
//         })
//     }

// })
// app.post("/api/auth/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         let userExist = await User.findOne({ email: email });
//         if (!userExist) {
//             return res.json({
//                 success: false,
//                 message: "user does not exist please signup"
//             })
//         }
//         if (userExist.password != password) {
//             return res.json({
//                 success: false,
//                 message: "Invalid password, please try again"
//             })

//         }
//         if (userExist.password == password) {
//             let token = jwt.verify({ "user": userExist }, "okkk")
//             return res.json({
//                 success: true,
//                 message: "login successfully",
//                 token: token
//             })
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({
//             error: {
//                 message: error.message
//             }
//         })
//     }


// })





// mongoose.connect("mongodb://127.0.0.1:27017/user")
//     .then(() => {
//         console.log("db connected")
//     })
//     .catch((err) => {
//         console.log(err.message)
//     })
// app.listen(5445, () => {
//     console.log("server started")
// })

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/users");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "server running ok" });
});

// 🔑 Secret key for JWT
const JWT_SECRET = "mysecretkey"; // (store in .env normally)

// Signup
app.post("/api/users/signup", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    let userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.json({
        success: false,
        message: "User already exists with this email. Please login",
      });
    }

    let newUser = new User({ name, email, password });
    await newUser.save();

    res.json({
      success: true,
      message: "User registered successfully. Please login to continue",
    });
  } catch (error) {
    res.json({ error: { message: error.message } });
  }
});

// Login + Generate Token
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.json({ success: false, message: "User does not exist. Please signup" });
    }

    if (userExist.password !== password) {
      return res.json({ success: false, message: "Invalid password" });
    }

    // ✅ Generate token
    const token = jwt.sign(
      { id: userExist._id, email: userExist.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    res.json({ error: { message: error.message } });
  }
});

// Middleware to verify token
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ message: "Token missing" });

  const token = authHeader.split(" ")[1]; // Format: Bearer <token>
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid or expired token" });
    req.user = decoded; // decoded payload
    next();
  });
}

// Protected route
app.get("/api/home", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to Home Page (Protected)",
    user: req.user, // decoded token data
  });
});

// DB connect + start server
mongoose
  .connect("mongodb://127.0.0.1:27017/g27db")
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err.message));

app.listen(5445, () => {
  console.log("server started");
});
