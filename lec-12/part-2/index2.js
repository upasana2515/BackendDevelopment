let edit = document.querySelector(".edit");
let del = document.querySelector(".del");

console.dir(edit);
console.dir(del);

let id = del.parentElement.parentElement.parentElement.getAttribute("id");
console.log("ID of the parent element:", id);

//homework
//first last and nth child access krna h