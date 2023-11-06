//Gameboard module

const gameBoard = (function () {

    const board = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];


    function reset () {
        board.forEach((outElement) => {
            for(let i = 0; i<outElement.length; i++){
                outElement[i]="";
            }
        });
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
        let col =1;
        let columns;
        for(let i=0; i<3; i++){
            columns = board.map(element => element[i]);
            
            if(columns.every((colItem)=> colItem == token)){
                return true;
            }
        }
        return false;
    }

    return { reset, display, placeToken, checkRows, checkColumns };
})();



//Player function factory
function createPlayer (name, token, isTurn) {

    return { name, token, isTurn };
}


//Game function family
function game () {

    let turn = 0;
    gameBoard.reset();


    const player1 = createrPlayer ("Player 1", "X", true);
    const player2 = createPlayer ("Player 2", "O", false);


}

console.log(gameBoard);