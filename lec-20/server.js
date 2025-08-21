const express = require("express");
const app = express();

const { m1, m2, checkAdmin } = require("./middleware/middleware");
const blogRoutes = require("./routes/blogsRoutes");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// global middleware
app.use(m1);

app.get("/home", (req, res) => {
    console.log("running home");

    res.json({
        success: true,
        message: "welcome to home page"
    });
});

// middleware after /home
app.use(m2);

app.get("/dashboard", checkAdmin, (req, res) => {
    if (req.isAdmin) {
        console.log("running on admin dashboard");
        return res.json({
            success: true,
            message: "admin dashboard"
        });
    }

    return res.json({
        success: false,
        message: "Not authorised"
    });
});

// blogs router
app.use("/api/blogs", blogRoutes);

app.listen(3232, () => {
    console.log("server started");
});
