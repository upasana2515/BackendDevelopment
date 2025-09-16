// const User = require("../model/user");

// exports.createUser = async (req, res) => {
//   let { name, email, password } = req.body;

//   let newUser = new User({ name, email, password });
//   await newUser.save();

//   res.json({ success: true, message: "User added", data: newUser });
// };

// exports.getAllUsers = async (req, res) => {
//   let users = await User.find();
//   res.json({ success: true, message: "All users fetched", data: users });
// };

// exports.getUserById = async (req, res) => {
//   let user = await User.findById(req.params.id);
//   res.json({ success: true, message: "User fetched", data: user });
// };
const User = require("../model/user");

exports.createUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    let newUser = new User({ username, email, password });
    await newUser.save();

    res.json({ success: true, message: "User added", data: newUser });
  } catch (err) {
    res.json({ success: false, message: "Error creating user", error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  let users = await User.find();
  res.json({ success: true, message: "All users fetched", data: users });
};

exports.getUserById = async (req, res) => {
  let user = await User.findById(req.params.id);
  res.json({ success: true, message: "User fetched", data: user });
};
