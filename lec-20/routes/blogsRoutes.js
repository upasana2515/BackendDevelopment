const express = require("express");
const { isLogin } = require("../middleware/middleware");

const router = express.Router();

// global middleware for all routes in this router
router.use(isLogin);

// fetch all blogs
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "all blogs fetched"
    });
});

router.get("/:id", (req, res) => {
    res.json({
        success: true,
        message: `blog with id ${req.params.id} fetched`
    });
});

module.exports = router;
