//Gameboard module
const gameOverDialog = document.querySelector("#gameOver");
const newGameDialog = document.querySelector("#newGame");
const newGameButton = document.querySelector("#newGameButton");



const gameBoard = (function () {

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
    };

    //for testing purposes.
    function display() {
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
        let correctMove=false;

        if(!gameOver && turn<=9){
            correctMove = gameBoard.placeToken(x,y, currentPlayer.token);
            gameOver = gameBoard.checkWin(currentPlayer.token);
        }
        
        // gameBoard.display();
        // console.log("Turn:"+turn);
        // console.log("Game over?"+gameOver);
        // console.log("correct?"+correctMove);

        if(gameOver) return {gameOver, winner : currentPlayer.name+" is the winner!"};
        else if(turn>=9) {
            gameOver = true;
            return {gameOver, winner: "It is a draw!"};
	    }
        else if(correctMove) {
            switchPlayer();
            turn++;
	    return {gameOver, winner: ""};
        }
        
    }

    function retrieveToken () {
        return currentPlayer.token;
    }

    
    return { playToken, switchPlayer, retrieveToken }
    
}


const displayController = (() => {

    let player1Name = "player 1";
    let player2Name = "player 2";
    let result = {};
    let currentBoard = gameBoard;
    let currentGame;
    let cells = Array.from(document.querySelectorAll(".cell"));

    function handlePlacement(event) {            
        //splits the string into an array, need the ... to spread out the array
        console.log(event.target.getAttribute("id"));
        result = currentGame.playToken(...event.target.getAttribute("id").split(','));
        console.log(result);
       
        if (result.gameOver===true) { showResult(result.winner); }
            updateDisplay();
    }

    function removeClickEvents() {
        for(const cell of cells) {
            cell.removeEventListener('click',handlePlacement);
        }
    }
    function setClickEvents() {
        for(const cell of cells) {
            cell.addEventListener('click', handlePlacement, {once: true});
        }
    }

    function updateDisplay() {
        for(const cell of cells){
            const [cellx, celly] = cell.getAttribute("id").split(',');
            cell.textContent = currentBoard.board[cellx][celly];
        }
        if(result.gameOver===false){
            handleTokenHover();
        }
    }
    
    function resetGame() {
        currentBoard.reset();
        gameOverDialog.close();
        updateDisplay();
        newGameDialog.show();
    }

    function newGameDialogue(){
        let newP1Name = newGameDialog.querySelector("#p1name").value;
        let newP2Name = newGameDialog.querySelector("#p2name").value;

        player1Name = newP1Name == "" ? player1Name : newP1Name; 
        player2Name = newP2Name == "" ? player2Name : newP2Name;
        
        console.log(player2Name);
        document.querySelector("#player1").textContent=player1Name;
        document.querySelector("#player2").textContent=player2Name;
        setClickEvents();
        // handleTokenHover();
        newGameDialog.close();
    }

    function showResult(winner) {
        removeClickEvents();
        clearHover();
        gameOverDialog.querySelector("p").textContent = winner;
        gameOverDialog.show();
    }

    function handleTokenHover() {
        for (const cell of cells) {
            console.log(cell.textContent);
            if(currentGame.retrieveToken()==="X"){
                if(cell.textContent=="") { 
                    cell.classList.add("tokenX");
                    cell.classList.remove("tokenO");
                }
            } else if (currentGame.retrieveToken()==="O"){
                if(cell.textContent==""){
                    cell.classList.add("tokenO");
                    cell.classList.remove("tokenX");
                }
            }
            
            if(cell.textContent!="") {
              cell.classList.remove("tokenX");
              cell.classList.remove("tokenO");
            }
        }
    }

    function clearHover() {
        for (const cell of cells) {
            cell.classList.remove("tokenX");
            cell.classList.remove("tokenO");
        }
    }

    //initialize screen and set initial first game values
    (function () {
	    newGameDialog.show();

        newGameButton.addEventListener("click", (event) => {
            newGameDialogue();
            event.preventDefault();
            

            currentGame = game(player1Name,player2Name);
            handleTokenHover();
        })
    })();
    
    return {resetGame};
})();
