// Individual cells
let topLeft = document.querySelector("#top-left");
let topMid = document.querySelector("#top-mid");
let topRight = document.querySelector("#top-right");
let centerLeft = document.querySelector("#center-left");
let centerMid = document.querySelector("#center-mid");
let centerRight = document.querySelector("#center-right");
let bottomLeft = document.querySelector("#bottom-left");
let bottomMid = document.querySelector("#bottom-mid");
let bottomRight = document.querySelector("#bottom-right");

let message = document.querySelector("#message");

const empty = "_";

let myArray = [
    [empty, empty, empty],
    [empty, empty, empty],
    [empty, empty, empty]
];

// function makeCellDrawer(cell, arrayPosition) {
//     return function(token) {
//         cell.addEventListener("click", () => {
//             arrayPosition = token;
//             cell.textContent = arrayPosition;
//         })
//     } 
// }

// const drawtoTL = makeCellDrawer(topLeft, myArray[0][0]);


// New version passing positions rather than array, using setPosition()
const setPosition = (x, y, token) => {
    if (myArray[x][y] === empty) {
        message.textContent = "";
        return myArray[x][y] = token;
    }
    message.textContent = "You cannot overwrite that position.";
}; 

function makeCellDrawer(cell, x, y) {
    return function(token) {
        cell.addEventListener("click", () => {
            setPosition(x, y, token);
            cell.textContent = myArray[x][y];
        })
    } 
}

const drawtoTL = makeCellDrawer(topLeft, 0, 0);
const drawtoTM = makeCellDrawer(topMid, 0, 1);
const drawtoTR = makeCellDrawer(topRight, 0, 2); 
const drawtoCL = makeCellDrawer(centerLeft, 1, 0);
const drawtoCM = makeCellDrawer(centerMid, 1, 1);
const drawtoCR = makeCellDrawer(centerRight, 1, 2);
const drawtoBL = makeCellDrawer(bottomLeft, 2, 0);
const drawtoBM = makeCellDrawer(bottomMid, 2, 1);
const drawtoBR = makeCellDrawer(bottomRight, 2, 2);

// Dummy moves
drawtoTL("X");
drawtoTM("O");
drawtoTR("X");
drawtoCL("O");
drawtoCM("X");
drawtoCR("O");
drawtoBL("X");
drawtoBM("O");
drawtoBR("X");