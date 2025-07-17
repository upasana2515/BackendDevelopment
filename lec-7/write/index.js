const fs = require("fs")
let users =[
    {
        id:1,
        name:"Upasana",
        age:"19"
    },
    {
        id:2,
        name:"yuvika",
        age:"20"
    },
]
fs.writeFile("../users1.txt",JSON.stringify(users),function(err){ //users.toString() --> JSON.stringify(users)
    if(err) return console.log(err);
    console.log("user written")
})