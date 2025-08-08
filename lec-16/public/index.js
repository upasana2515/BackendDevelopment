// function getCommentData(){
//     axios.get("https://jsonplaceholder.typicode.com/comments")
//     .then((res) => {
//         console.log(res.data);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// }
// getCommentData();

//using async await
async function getCommentData() {
    try {
        let res = await axios.get("https://jsonplaceholder.typicode.com/comments");
        console.log(res.data);
        
    } catch (err) {
        console.error(err.message);
    }
}
getCommentData();

function adduser(email,password){
    axios.post("http://localhost:3000/user", {
        email: email,
        password: password
    })
    .then((res)=>{
        console.log(res.data);
    }).catch((err)=>{
        console.error(err.message);
    })
}
adduser("email.com","123");