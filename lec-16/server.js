const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/user',(req,res)=>{
    try{
    let email = req.body.email;
    let password = req.body.password;
    console.log(email, password);
    res.json({
        success: true,
        data: {
            email,
            password
            },
    })
} catch (err) {
    req.json({
        success: false,
        message: err.message
        })
    }   
})

app.listen(3000, (req,res) => {
    console.log('Server is running on port 3000');
});
//data input se utha ke server pe file pe store karwana h