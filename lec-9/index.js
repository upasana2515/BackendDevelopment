// const express = require("express");
// const app = express();
// const PORT = 3333;
// const fs = require("fs");

// const userfile = "/user.json";

// app.use(express.json());

// app.get('/',(req,res)=>{
//     res.send("this is my express server");
// })
// app.post('/send',(req,res)=>{
//     const data = req.body;
//     console.log(data);
//     res.json({
//         recieved:data
//     });
// })
// app.listen(3333,()=>{
//     console.log(`server started on${3333}`);
// })


const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3333;

const USERS_FILE = "user.json";

app.use(express.json());
app.post("/userregis", (req, res) => {
    const newUser = req.body;

    if (!newUser.username || !newUser.email) {
        return res.status(400).json({ message: "Username and email not provided" });
    }
    fs.readFile(USERS_FILE, "utf-8", (err, data) => {
        let users = [];

        if (!err && data) {
            try {
                users = JSON.parse(data);
            } catch (e) {
                return res.status(500).json({ message: "Error parsing user file" });
            }
        }
        const exists = users.find(u => u.username === newUser.username);
        if (exists) {
            return res.status(409).json({ message: "User already exists" });
        }

        users.push(newUser);

        fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: "Error saving user" });
            }

            res.status(201).json({ message: "User registered successfully", user: newUser });
        });
    });
});
app.get("/", (req, res) => {
    fs.readFile(USERS_FILE, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading user file" });
        }

        try {
            const users = JSON.parse(data);
            res.json(users); 
        } catch (e) {
            return res.status(500).json({ message: "Error parsing user file" });
        }
    });
});


app.listen(PORT, () => {
    console.log("Server started on port", PORT);
});
