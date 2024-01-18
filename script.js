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

    for (let i = 0; i < rows; i++) {
        boardArray[i] = [];
        for (let j = 0; j < columns; j++) {
            boardArray[i].push(empty);
        }
    }

    // Public properties

    // Check if the board is full (returns boolean)


    // Public methods
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
        // while (boardArray[x][y] === empty) {
        //     return boardArray[x][y] = token;
        // }
    }; 

    // Return object
    return { isFull, showBoard, setPosition, boardArray };  // TEMP: return boardArray for debuggin purposes
})();


// Factory function to make players
function makePlayer(token) {
    const playerName = `${token} Player`;
    const playerToken = token;
    let isActive = false;
    let numberOfWins = 0;  // Used if multiple rounds are played.

    return { playerName, playerToken, isActive, numberOfWins };
}


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

    let gameOver = false;

    // Running the game until a game over condition is met
    while (!gameOver) {
        let isXWinner = winConditions(board.boardArray, playerX.playerToken);
        let isOWinner = winConditions(board.boardArray, playerO.playerToken);

        if (board.isFull() || isXWinner || isOWinner) {
            gameOver = true;
            console.log("Game over!");
            board.showBoard();
            break
        }
        
        let activePlayer = getActivePlayer(playerX, playerO);
        console.clear();
        board.showBoard();

        // Temporary user interface:
        let x = prompt(`${activePlayer.playerToken}'s turn! x coordinate:`);
        let y = prompt(`${activePlayer.playerToken}'s turn! y coordinate:`);
        board.setPosition(x, y, activePlayer.playerToken);
        
        switchPlayer(playerX, playerO);
    }

})();


