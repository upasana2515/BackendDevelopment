const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/sum', (req, res) => {
    let { a, b } = req.body;
    if(!a || !b){
        return res.json({ 
            success: false,
            message : "Invalid argument"
        });
    }
    res.json({ 
        success: true,
        data : a+b
    });
})
app.post('/multiply', (req, res) => {
    let { a, b } = req.body;
    if(!a || !b){
        return res.json({ 
            success: false,
            message : "Invalid argument"
        });
    }
    res.json({
        success: true,
        data : a*b
    });
});


module.exports = app;
// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });