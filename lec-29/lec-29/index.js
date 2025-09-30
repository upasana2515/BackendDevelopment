const {PrismaClient} = require("./generated/prisma");
let prisma = new PrismaClient();

async function addUser(email,name) {
    // User user = new User("","");
    // user.save()
    const newUser = await prisma.user.create({
        data:{
            email:email,
            name:name
        }
    })
    return "user added";
}

addUser("upasana@gmail.com","upasana")
.then((data)=>console.log(data))
.catch((e)=>console.log(e))

async function getUser(email) {
    let user = await prisma.user.findUnique({
        where: {
            email:email
        }
    })
    return user
}
getUser("upasana@gmail.com")
.then((data)=>console.log(data))
.catch((e)=>console.log(e))

async function updateUser(email,name) {
    let updateUser = await prisma.user.update({
        where: {
            email:"upasana@gmail.com"
        },
        data: {
            name: name
        }
    })
    return updateUser
}
updateUser("upasana@gmail.com","Upasanaaaa")
.then((data)=>console.log(data))
.catch((e)=>console.log(e))


// async function deleteUser(email) {
//     let deleteUser = await prisma.user.delete({
//         where: {
//             email:"yuvika@gmail.com"
//         }
//     })
//     return deleteUser
// }
// deleteUser("yuvika@gmail.com")
// .then((data)=>console.log(data))
// .catch((e)=>console.log(e))

async function addTweet(userId,body) {
    try{
        let newTweet = await prisma.tweet.create({
            data: {
                userId: Number(userId),
                body: body,
                content:String
            }
        })
        return newTweet;
    } catch(error){
        throw new Error(error.message)
    }
}

// Example usage
addTweet("1", "Hello, this is my first tweet!")
    .then((data) => console.log("Tweet Added:", data))
    .catch((e) => console.error(e));

    async function UpdateTweet(id,userId, updateBody){
        let tweet = prisma.tweet.findFirst({
            where: {
                id:Number(id),
                userId:Number(userId)
            }
        })
        if(!tweet){
            return "something is wrong";
        }
        await prisma.tweet.update({
            where: {
                id:Number(id)
            },
            data: {
                body: updateBody
            }
        })
        return "tweet updated";
    }
    UpdateTweet(1,1,"This is the updated tweet body")
    .then((data) => console.log("Tweet Updated:", data))
    .catch((e) => console.error(e));

    async function deleteUser(id){
        await prisma.user.delete({
            where: {
                id:Number(id)
            }
        })
        return "user deleted";
    }
    deleteUser("1")
    .then((data) => console.log(data))
    .catch((e) => console.error(e));