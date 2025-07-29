let colorbox = document.getElementById("colorbox");
let btn = document.getElementById("btn");

const colors = ['red', 'pink','blue', 'green', 'yellow', 'purple', 'orange', 'brown', 'peach', 'cyan'];

function getRandomColor() {
  let randomIndex = Math.floor(Math.random() * colors.length);
  let randomColor = colors[randomIndex];
  console.log("Color index:", randomIndex, "->", randomColor);
  colorbox.style.backgroundColor = randomColor;
}

let intervalStarted = false;

btn.addEventListener("click", function () {
  id=setInterval(() => {
    getRandomColor();
  }, 500);
});
stopbtn.addEventListener("click", function () {
    if (id) {
        clearInterval(id);
    }
});
