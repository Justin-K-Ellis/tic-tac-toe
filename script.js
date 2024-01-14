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

    const setPosition = (x, y, piece) => {
        if (boardArray[x][y] === empty) {
            return boardArray[x][y] = piece;
        }
        console.log("You cannot overwrite that position.");
    }; 

    // Return object
    return { isEmpty, showBoard, setPosition };
})();


let runGame = (function() {

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
    }

})();