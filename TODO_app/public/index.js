let workcontainer = document.querySelector(".workcontainer");
function getUsers(URL) {
    fetch(URL)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((title) => {
                showUser(title);
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

gettUsers("https://localhost:3987/title");

function showwork(work){
    let li = document.createElement("li");
    li.innerHTML = `
            <div class="workinfo">
                <h1>title</h1>
                <p>description</p>
            </div>
            <div class="user-btn">
                <button id="delete-title">REMOVE</button>
                <button id="edit">EDIT</button>
            </div>
    `;
    userContainer.appendChild(li);
}

