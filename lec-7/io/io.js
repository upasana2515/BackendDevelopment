const fs = require("fs");
function read(file){
    return new Promise((resolve,reject)=>{
        fs.readFile("../users.txt","utf-8",function(err,data){
        if(err) console.log(err)
        // console.log(data[0])
        let users = JSON.parse(data)
        resolve(users)
    })
    })
}

function write(file,data){
        return new Promise((resolve,reject)=>{
            fs.writeFile(file,data,function(err){ //users.toString() --> JSON.stringify(users)
                if(err){
                    console.log(err);
                    return reject(err);
                }
                resolve("done");
                console.log("user written")
            })
        })
    }

module.exports.read=read;
module.exports.write=write;

