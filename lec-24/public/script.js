// let signupForm = document.getElementById("signup-form");
// let signupUsername = document.getElementById("signup-username");
// let signupPassword = document.getElementById("signup-password");    
// let signupEmail = document.getElementById("signup-email");


// signupForm.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     let username = signupUsername.value;
//     let password = signupPassword.value;
//     let email = signupEmail.value;

//     let response = await fetch("/api/users", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ 
//             username: username,
//             password: password,
//             email: email
//         })
//     });

//     // if (response.ok) {
//     //     let result = await response.json();
//     //     alert(result.message);
//     //     window.location.href = "/login.html"; // Redirect to login page after successful signup
//     // } else {
//     //     let error = await response.json();
//     //     alert("Error: " + error.message);
//     // }
//     let data = await response.json();
//     console.log(data);
// });

let signupForm = document.getElementById("signup-form");
let signupUsername = document.getElementById("signup-username");
let signupPassword = document.getElementById("signup-password");    
let signupEmail = document.getElementById("signup-email");

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let username = signupUsername.value;
    let password = signupPassword.value;
    let email = signupEmail.value;

    let response = await fetch("/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            username: username,
            password: password,
            email: email
        })
    });

    let data = await response.json();
    console.log(data);

    if (data.success) {
        alert("User registered successfully!");
    } else {
        alert("Error: " + data.message);
    }
});
