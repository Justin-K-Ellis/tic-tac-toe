function winConditions(arr, t) {
    // t for player token
    if (arr[0][0] === t && arr[0][1] === t && arr[0][2] === t) { return true } // top row
    else if (arr[1][0] === t && arr[1][1] === t && arr[1][2] === t) { return true } // mid row
    else if (arr[2][0] === t && arr[2][1] === t && arr[2][2] === t) { return true } // bottom row
    else if (arr[0][0] === t && arr[1][0] === t && arr[2][0] === t) { return true} // left column
    else if (arr[0][1] === t && arr[1][1] === t && arr[2][1] === t) { return true } // mid column
    else if (arr[0][2] === t && arr[1][2] === t && arr[2][2] === t) { return true } // right column
    else if (arr[0][0] === t && arr[1][1] === t && arr[2][2] === t) { return true } // top-left to bottom-right
    else if (arr[0][2] === t && arr[1][1] === t && arr[2][0] === t) { return true } // top-irght to bottom-left
    else { return false };
}


let board = (function() {
    // Private properties
    const empty = "_";
    const rows = 3;
    const columns = 3;
    let boardArray = [];
    // Generate boardArray content
    for (let i = 0; i < rows; i++) {
        boardArray[i] = [];
        for (let j = 0; j < columns; j++) {
            boardArray[i].push(empty);
        }
    }

    // Public methods
    // Check if the board is full (returns boolean)
    const isFull = () => {
        return boardArray.every(row => row.every(space => space !== empty));
    };
    const showBoard = () => {
        console.table(boardArray);
    };


    const setPosition = (x, y, token) => {
        if (boardArray[x][y] === empty) {
            return boardArray[x][y] = token;
        }
        console.log("You cannot overwrite that position.");
    }; 

    // Return object
    return { isFull, showBoard, setPosition, boardArray };
})();


// Factory function to make players
function makePlayer(token) {
    const playerName = `${token} Player`;
    const playerToken = token;
    let isActive = false;
    let numberOfWins = 0;  // Used if multiple rounds are played.

    return { playerName, playerToken, isActive, numberOfWins };
}


// Render array to screen and allow user interaction
let renderToDOM = (function() {
    // Squares
    let topLeft = document.querySelector("#top-left");
    let topMid = document.querySelector("#top-mid");
    let topRight = document.querySelector("#top-right");
    let centerLeft = document.querySelector("#center-left");
    let centerMid = document.querySelector("#center-mid");
    let centerRight = document.querySelector("#center-right");
    let bottomLeft = document.querySelector("#bottom-left");
    let bottomMid = document.querySelector("#bottom-mid");
    let bottomRight = document.querySelector("#bottom-right");

    // When a cell in the DOM is clicked, assign a token to the 
    // corresponding position in the array, and display the token in 
    // the UI by giving the content of the array element to the DOM cell.
    function makeCellDrawer(cell, x, y) {  // X-axis position, not player X
        return function(token) {
            cell.addEventListener("click", () => {
                board.setPosition(x, y, token);
                cell.textContent = board.boardArray[x][y];
            })
        } 
    }

    // TODO: Not loading
    // Need a way to pass the array position to the function
    const drawtoTL = makeCellDrawer(topLeft, 0, 0);

    return { drawtoTL };
})();


let runGame = (function() {

    // Private variables and methods
    let playerX = makePlayer("X");
    let playerO = makePlayer("O");
    playerX.isActive = true;

    function getActivePlayer(player1, player2) {
        return player1.isActive ? player1 : player2;
    }

    function switchPlayer(player1, player2) {
        if (player1.isActive === true) {
            player1.isActive = false;
            player2.isActive = true;
        }
        else {
            player2.isActive = false;
            player1.isActive = true;
        }

    }

    // Running the game until a game over condition is met
    let gameOver = false;
    while (!gameOver) {
        let isXWinner = winConditions(board.boardArray, playerX.playerToken);
        let isOWinner = winConditions(board.boardArray, playerO.playerToken);

        if (board.isFull()) {
            gameOver = true;
            console.log("Cat's game. It's a tie!");
            board.showBoard();
            break
        }
        else if (isXWinner) {
            board.showBoard()
            console.log("X wins!");
            break
        }
        else if (isOWinner) {
            board.showBoard();
            console.log("Y wins!");
            break
        }
        
        let activePlayer = getActivePlayer(playerX, playerO);
        console.clear();
        board.showBoard();

        renderToDOM.drawtoTL(activePlayer.playerToken);

        switchPlayer(playerX, playerO);
    }

})();


