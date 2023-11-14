//Gameboard module
const gameOverDialog = document.querySelector("#gameOver");
const newGameDialog = document.querySelector("#newGame");

const gameBoard = (function () {

    // let gameWon = false;

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
        // gameWon = false;
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
            // gameWon = true;
            return true;
        }
        return false;
    }

    return { board, reset, display, placeToken, checkWin};
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
        let winner = ("Player: "+player+" is the winner!");
        gameOverDialog.querySelector("p").textContent = winner;
        gameOverDialog.show();
    }

    return { playToken, switchPlayer }
    
}


const displayController = (() => {

    let currentBoard = gameBoard;
    let currentGame = game("Steve","George");
    let cells = Array.from(document.querySelectorAll(".cell"));

    function setClickEvents() {
        for(const cell of cells) {
            cell.addEventListener('click', (event) => {            
                //splits the string into an array, need the ... to spread out the array
                console.log(event.target.getAttribute("id"));
                currentGame.playToken(...event.target.getAttribute("id").split(','));
                updateDisplay();
            }, {once: true});
        }
    }

    function updateDisplay() {
        for(const cell of cells){
            const [cellx, celly] = cell.getAttribute("id").split(',');
            cell.textContent = currentBoard.board[cellx][celly];
        }
    }
    
    function resetGame() {
        currentBoard.reset();
        currentGame=game("newSteve","NewGeorge");
        setClickEvents();
        gameOverDialog.close();
        updateDisplay();
    }

    function newGameDialogue(){

    }

    //initialize screen
    (function () {
        setClickEvents();


    })();
    
    return {resetGame};
})();

// function displayController(currentGame, currentBoard) {

//     let cells = Array.from(document.querySelectorAll(".cell"));

//     for(const cell of cells) {
//         cell.addEventListener('click', (event) => {            
//             //splits the string into an array, need the ... to spread out the array
//             console.log(event.target.getAttribute("id"));
//             currentGame.playToken(...event.target.getAttribute("id").split(','));
//             updateDisplay();
//         }, {once: true});
//     }

//     function updateDisplay() {
//         for(const cell of cells){
//             const [cellx, celly] = cell.getAttribute("id").split(',');
//             cell.textContent = currentBoard.board[cellx][celly];
//         }
//     }
    
//     return { updateDisplay };
// }


// const firstGame = game("Steve", "George");
// const controller = displayController(firstGame, gameBoard);
// console.log(gameBoard);