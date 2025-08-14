let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog" 
        }
    ]
});

module.exports = mongoose.model("User", userSchema);
