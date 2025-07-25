// accessing dom element/node
//1. using id
let res = document.getElementById("mydiv");
// console.log(res);
console.dir(res);

//2. using class
let res2 = document.getElementsByClassName("h2");  
console.log(res2); // list/collection
console.log(res2[0]);

//3. using tag name
let res3 = document.getElementsByTagName("p");
console.log(res3)

//4. using querySelector
let res4 = document.querySelector("#mydiv"); // returns object with first element with id mydiv
console.log(res4);

//5. using querySelectorAll
let res5 = document.querySelectorAll("p");    
console.log(res5); // list/collection


// Document Properties
// 1. accessing element content and changing it
// *innerHTML
console.log(res.innerHTML); // getter 
// res.innerHTML = <p>change using DOM manipulation</p>; // setter

// *innerText
console.log(res.innerText); // getter
// res.innerText = hello world; // setter

// *textContent
console.log(res.textContent); // getter
// res.textContent = hello world; // setter

// 2. accessing element class or id or etc
// *getAttribute
console.log(res.getAttribute("id")); // getter
let btn = document.querySelector(".btn");
btn.addEventListener("click",()=>{
    res.setAttribute("class", "js"); // setter
});
//2. only for class attribute
// *classList
let myh = document.querySelector(".h2");
console.log(myh.classList); // returns class list
myh.classList.add("hii"); // adds class
myh.classList.remove("myh"); // removes class
let form = document.querySelector(".signup");
btn.addEventListener("click",()=>{
    // myh.classList.toggle("jaiho"); // toggles class
    // res.classList.toggle("hide"); // toggles class
    form.classList.toggle("hide"); // toggles class
});

