const container = document.querySelector("#container");

const input = document.getElementById("grid-size");
const button = document.getElementById("set-grid");

const rainbow = document.getElementById("rainbow");
const draken = document.getElementById("draken");
const erasor = document.getElementById("erasor");

const colorPicker = document.getElementById("colorPicker");
const singleColor = document.getElementById("singleColor");

let currentMode = 'draken';
let userColor = '#000000';
let mouseDown = false;

document.body.addEventListener("mousedown", () => {
    mouseDown = true;
});

document.body.addEventListener("mouseup", () => {
    mouseDown = false;
});

button.addEventListener("click", () => {
    let size = parseInt(input.value);

    if (isNaN(size) || size < 1 || size > 100){
        alert("please enter a number between 1 to 100");
        return;
    }
    createGrid(size);
    
});

function randomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

function createGrid(size){
    container.innerHTML = "";
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;


    for(let i = 0; i < size * size; i++){
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.darkness = 0;

        cell.addEventListener("mouseenter", () => {
            if (!mouseDown) return;

            if (currentMode === 'draken'){
                let current = Number(cell.dataset.darkness);
                if (current < 1){
                    current += 0.1;
                    cell.dataset.darkness = current.toFixed(1);
                    const darkness = 255 - Math.floor(255 * current);
                    cell.style.backgroundColor = `rgb(${darkness},${darkness},${darkness})`;
                }
            }

            if (currentMode === 'rainbow'){
                cell.style.backgroundColor = randomRGB();
            }
            else if (currentMode === 'erasor'){
                cell.style.backgroundColor = "white";
                cell.dataset.darkness = 0;
            }
            else if (currentMode === 'singleColor'){
                cell.style.backgroundColor = userColor;
            }
     
          });
          container.appendChild(cell);
        };
};

draken.addEventListener('click', () => {
  currentMode = 'draken';
});

rainbow.addEventListener('click', () => {
  currentMode = 'rainbow';
});

erasor.addEventListener("click", () => {
    currentMode = 'erasor';
});

singleColor.addEventListener("click", () => {
    currentMode = 'singleColor';
    userColor = colorPicker.value;
})
