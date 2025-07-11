// let p = new Promise((resolve,reject)=>{
//     resolve("okay")
// })
// // console.log(p);
// p.then((data)=>{
//     console.log(data)
//     console.log("promise completed")
// })
// p.catch((err)=>{
//     console.log(err)
// })
// // console.log("promise completed")

let users =[
    {
        id:1,
        age:16,
        name:"yashu"
    },
    {
        id:2,
        age:20,
        name:"yashu2"
    }
]
function isEligible(id){
    //find user in db
    //check age is greater or equal to 18;
    //if else
    // let user = users.filter((user)=> user.id==id)[0];
    // console.log(user)
    // if(!user) return "no user found";
    // if(user.age>=18){
    //     return "eligible for vote";
    // }else{
    //     return "not eligible";
    // }

    // console.log(isEligible(1));
// console.log("hi");
// console.log("bye");


    return new Promise((resolve,reject)=>{
        let user = users.filter((user)=>user.id ==id)[0];
        console.log(user);
        if(!user)return reject ("no user found");
        if(user.age>=18){
            return resolve("eligible for vote")
        }else{
            return reject("not eligible")
        }
    })
}
isEligible(1).then((data)=>{
    console.log(data)
})
.catch((err)=>{
    console.log(err)
})
console.log("hi");
console.log("bye");