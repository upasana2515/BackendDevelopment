const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const{ createClient } = require("redis");

const client = createClient();

async function connect(){
const client = await createClient();
await client.connect()
client.on("error",function(err){
    console.log("Error"+err);
})
}

// app.get("/profile",(req,res)=>{
//     let user = readUser();
//     res.json(JSON.parse(user));
// })


connect()
.then(()=>{
    app.listen(3000,()=>{
        console.log("connected to redis");
    });
})


async function cachedData(){
    await client.connect()
    await client.set("users:100",JSON.stringify([{
        name:"upasana",
        age:"20"

    }]))
}
cachedData()
.then(()=>{
    console.log("data cached");
})
async function readUser(){
    await client.connect();
    let user = await client.get("users:100");
    return user;
}
// readUser()
// .then((res)=>{
//     console.log(JSON.parse(res));
// })