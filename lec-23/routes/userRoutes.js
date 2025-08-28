const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// User routes
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);

module.exports = router;
