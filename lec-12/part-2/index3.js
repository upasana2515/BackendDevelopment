//how ro insert  new element in dom
//1. create a new element ----> createElement
//2. add content to the element ----> innerHTML, innerText, textContent
//3.add that element in parent container ----> appendChild, insertBefore, replaceChild
let todo = {
    id:"3435435",
    title :"Todo4"
}
let ul = document.querySelector(".Todolist"); // select the ul element
function addTodo(){
    let li = document.createElement("li"); // create a new li element
    li.setAttribute("id", `${todo.id}`); // set the id attribute of the li element
    li.innerHTML = `<div>
                <input type="checkbox" name ="" id="checkbox1">
                <h1>${todo.title}</h1>
                <div>
                <button class="edit" id="btn1">edit</button>
                <button class="del" id="btn2">delete</button>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                </div>
            </div>`
            ul.appendChild(li); // append the li element to the ul
}
addTodo();