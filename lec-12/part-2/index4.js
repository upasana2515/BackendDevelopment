//event
let body = document.querySelector("body");
body.addEventListener("click", function(ev){
    console.log(ev.target.innertext);
})

///todo list
//input box add button
//add button will add the todo item to the list
//each todo item will have a checkbox, title, edit button, delete button
//checkbox will mark the todo item as done