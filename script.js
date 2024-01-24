function winConditions(arr, t) {
    // t for player token
    if (arr[0][0] === t && arr[0][1] === t && arr[0][2] === t) { return true } // top row
    else if (arr[1][0] === t && arr[1][1] === t && arr[1][2] === t) { return true } // mid row
    else if (arr[2][0] === t && arr[2][1] === t && arr[2][2] === t) { return true } // bottom row
    else if (arr[0][0] === t && arr[1][0] === t && arr[2][0] === t) { return true} // left column
    else if (arr[0][1] === t && arr[1][1] === t && arr[2][1] === t) { return true } // mid column
    else if (arr[0][2] === t && arr[1][2] === t && arr[2][2] === t) { return true } // right column
    else if (arr[0][0] === t && arr[1][1] === t && arr[2][2] === t) { return true } // top-left to bottom-right
    else if (arr[0][2] === t && arr[1][1] === t && arr[2][0] === t) { return true } // top-right to bottom-left
    else { return false };
}


let board = (function() {
    // Private properties
    const empty = "_";
    const rows = 3;
    const columns = 3;

    // Public properties
    let boardArray = [];
    let overwriteAttempt = false;
    
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


    const setPosition = (x, y, token) => {
        if (boardArray[x][y] === empty) {
            renderToDOM.message.textContent = "";
            return boardArray[x][y] = token;
        }
        renderToDOM.message.textContent = "You cannot overwrite that position. Skip a turn.";
    }; 

    // Return object
    return { isFull, setPosition, boardArray, overwriteAttempt }; 
})();


// Factory function to make players
function makePlayer(token) {
    const playerName = `Player ${token}`;
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

    // All cells
    allCells = document.querySelectorAll(".cell");

    // Messages to user
    let turnDisplay = document.querySelector("#turn-display");
    let message = document.querySelector("#message");

    // Buttons
    const restart = document.querySelector("#restart");

    return {
        topLeft, topMid, topRight,
        centerLeft, centerMid, centerRight,
        bottomLeft, bottomMid, bottomRight,
        message, allCells,turnDisplay, restart,
    }
})();


let runGame = (function() {

    // Public variables
    let playerX = makePlayer("X");
    let playerO = makePlayer("O");
    let isXWinner;
    let isOWinner;

    playerX.isActive = true;

    function getActivePlayer(player1, player2) {
        return player1.isActive ? player1 : player2;
    }

    function switchPlayer(player1, player2) {
        if (player1.isActive === true) {
            player1.isActive = false;
            player2.isActive = true;
            renderToDOM.turnDisplay.textContent = `${player2.playerName}'s turn`;
        }
        else {
            player2.isActive = false;
            player1.isActive = true;
            renderToDOM.turnDisplay.textContent = `${player1.playerName}'s turn`; 
        }
    }

    // User interaction
    function handleClick(cell, x, y) {
        const activePlayer = getActivePlayer(playerX, playerO);
        board.setPosition(x, y, activePlayer.playerToken);
        cell.textContent = board.boardArray[x][y];
        isXWinner = winConditions(board.boardArray, playerX.playerToken);
        isOWinner = winConditions(board.boardArray, playerO.playerToken);

        if (isXWinner) {
            renderToDOM.message.textContent = "Player X wins!";
        }
        else if (isOWinner) {
            renderToDOM.message.textContent = "Player O wins!";
        }
        else if (board.isFull()) {
            renderToDOM.message.textContent = "Cat's game! It's a tie!";
        }
        switchPlayer(playerX, playerO);
    }

    // Attach event listeners to DOM objects
    renderToDOM.topLeft.addEventListener("click", () => {
        handleClick(renderToDOM.topLeft, 0, 0);
    });
    renderToDOM.topMid.addEventListener("click", () => {
        handleClick(renderToDOM.topMid, 0, 1);
    });
    renderToDOM.topRight.addEventListener("click", () => {
        handleClick(renderToDOM.topRight, 0, 2);
    });
    renderToDOM.centerLeft.addEventListener("click", () => {
        handleClick(renderToDOM.centerLeft, 1, 0);
    });
    renderToDOM.centerMid.addEventListener("click", () => {
        handleClick(renderToDOM.centerMid, 1, 1);
    });
    renderToDOM.centerRight.addEventListener("click", () => {
        handleClick(renderToDOM.centerRight, 1, 2)
    });
    renderToDOM.bottomLeft.addEventListener("click", () => {
        handleClick(renderToDOM.bottomLeft, 2, 0);
    });
    renderToDOM.bottomMid.addEventListener("click", () => {
        handleClick(renderToDOM.bottomMid, 2, 1);
    });
    renderToDOM.bottomRight.addEventListener("click", () => {
        handleClick(renderToDOM.bottomRight, 2, 2);
    })

    // Restart game
    renderToDOM.restart.addEventListener("click", () => {
        location.reload();
    })

})();


