const signupForm = document.querySelector("#signup");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

function adduser(email,password){
    let newUser = {
        email: email,
        password: password
    }
    fetch("/adduser", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        console.log(data)
        if(data.success){
            alert(data.message);
            signupForm.reset();
        } else {
            alert(data.error);
            signupForm.reset();
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

signupForm.addEventListener("submit", function(e) {
    e.preventDefault();
    adduser(email.value, password.value);
})
adduser("upasana@gmail.com","1234");