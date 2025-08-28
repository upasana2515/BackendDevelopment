let mongoose = require("mongoose");

let blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    date: { type: Date, default: Date.now },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // User collection ka reference
    }
});

module.exports = mongoose.model("Blog", blogSchema);