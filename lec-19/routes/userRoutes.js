const express = require("express");
const { postAddUser, getAllUser, getOneUser } = require("../controller/userController");

const router = express.Router();

// Create user
router.post("/", postAddUser);

// Get all users
router.get("/", getAllUser);

// Get single user by ID
router.get("/:id", getOneUser);

module.exports = router;
