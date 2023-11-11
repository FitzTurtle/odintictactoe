//Gameboard module

const gameBoard = (function () {

    let gameWon = false;

    const board = [
        ['','',''],
        ['','',''],
        ['','','']
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
        console.table(board);
    };

    function placeToken (row,col, token) {

        let isValidRow = row>=0 && row<3;
        let isvalidCol = col>=0 && col<3;
        
        if(isValidRow && isvalidCol && board[row][col]===''){
            board[row][col] = token;
            return true;
        }
        return false;
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
function game(playerOne, playerTwo) {

    let gameOver = false;
    let turn = 1;
    gameBoard.reset();

    const player1 = createPlayer (playerOne, "X", true);
    const player2 = createPlayer (playerTwo, "O", false);

    let currentPlayer = player1;

    const switchPlayer = () => { 
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const playToken = (x,y) => {

        if(!gameOver && turn<=9){
            var correctMove = gameBoard.placeToken(x,y, currentPlayer.token);
            gameOver = gameBoard.checkWin(currentPlayer.token);
        }
        
        gameBoard.display();
        console.log("Turn:"+turn);
        console.log("Game over?"+gameOver);

        if(gameOver) showResult(currentPlayer.name);
        else if(turn>=9) showResult("Cat");
        else if(correctMove) {
            switchPlayer();
            turn++;
        }
        
    }

    const showResult = (player) => {
        console.log("Player: "+player+" is the winner!");
    }

    return { playToken, switchPlayer }
    
}

const firstgame = game("Steve", "George");
console.log(gameBoard);