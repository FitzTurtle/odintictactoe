//Gameboard module

const gameBoard = (function () {

    let gameWon = false;

    const board = [
        [0,0,"X"],
        [0,"X",0],
        ["X",0,0]
    ];


    function reset () {
        board.forEach((outElement) => {
            for(let i = 0; i<outElement.length; i++){
                outElement[i]="";
            }
        });
        gameWon = false;
    };

    //for testing purposes.
    function display () {
        console.log(board);
    };

    function placeToken (row,col, token) {
        board[row][col] = token;
    };

    function checkRows (token) {
        for(let i =0; i<3; i++) {
            if(board[i].every((rowItem)=> rowItem == token)){
                return true;
            };
        }
        return false;
    }

    function checkColumns (token) {
        let columns = [];
        for(let i=0; i<3; i++){
            columns = board.map(element => element[i]);
            
            if(columns.every((colItem)=> colItem == token)){
                return true;
            }
        }
        return false;
    }

    function checkDiagonals (token) {
        const diag1 = [board[0][0],board[1][1],board[2][2]];
        const diag2 = [board[0][2],board[1][1],board[2][0]];

        return diag1.every((item)=> item==token) || diag2.every((item=> item==token));
    }

    function checkWin(token) {
        if(checkColumns(token) || checkDiagonals(token) || checkRows(token)){
            gameWon = true;
            return true;
        }
        return false;
    }

    return { reset, display, placeToken, checkWin};
})();



//Player function factory
function createPlayer(name, token, isTurn) {

    return { name, token, isTurn };
}


//Game function family
function game() {

    let gameOver = false;
    let turn = 0;
    gameBoard.reset();

    const player1 = createrPlayer ("Player 1", "X", true);
    const player2 = createPlayer ("Player 2", "O", false);

    let currentPlayer = player1;

    const switchPlayer = () => { 
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const playToken = (x,y) => {
        board.placeToken(x,y, currentPlayer.token);
    }

}

console.log(gameBoard);