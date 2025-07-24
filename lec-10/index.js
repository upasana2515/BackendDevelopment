const express = require('express');
const port = 3333;
const app = express();
const fs = require("fs");
app.use(express.json());
// app.get("/index.html", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

// app.get("/about.html", (req, res) => {
//     res.sendFile(__dirname + "/about.html");
// });

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// app.post("/adduser", (req, res) => {
//     console.log(req.body); 
//     let name = req.body.name;
//     let email = req.body.email;
//     let password = req.body.password;   
//     // res.json({
//     //     name: name,
//     //     email: email,               
//     //     password: password
//     // });
//     fs.writeFile('./data.json', JSON.stringify({ name ,email,password }),(err) => {
//     if (err) {
//         console.error('Error writing to file', err);
//     } else {
//         console.log('user data stored successfully');
//     }
// });
// });

app.post("/adduser", (req, res) => {
    console.log(req.body); 
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password; 

    fs.writeFile('./data.json', JSON.stringify({ username, email, password }, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).json({ message: 'Failed to store user data' });
        } else {
            console.log('User data stored successfully');
            return res.status(200).json({ message: 'User data stored successfully' });
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
