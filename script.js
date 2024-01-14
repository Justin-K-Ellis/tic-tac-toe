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
    let isEmpty = boardArray.some(row => row.some(space => space === empty));

    // Public methods
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
    return { isEmpty, showBoard, setPosition };
})();


function makePlayer(playerToken) {
    const playerName = `${playerToken} Player`;
    const playerToken = playerToken;
    let isActive = false;
    let numberOfWins = 0;  // Used if multiple rounds are played.

    return { playerName, playerToken, isActive, numberOfWins };
}


let runGame = (function() {

    let playerX = makePlayer("X");
    let playerO = makePlayer("O");
    playerX.isActive = true;

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

    while (!gameOver) {
        if (!board.isEmpty) {
            gameOver = true;
        }
        
        console.clear();
        board.showBoard();

        // Temporary user interface:
        let x = prompt("x coordinate:");
        let y = prompt("y coordinate:");
        let player = prompt("Your piece:");
        board.setPosition(x, y, player);
        switchPlayer(playerX, playerO);
    }

})();


