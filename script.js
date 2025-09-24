//Players are stored in objects

//Try to have little global code as possible~

//Our grid and where we place our moves.
const gameBoard = (function () {
  let rows = 3;
  let cols = 3;

  let grid = [];

  const getRows = () => rows;
  const getCols = () => cols;

  //Sets up our 3x3 grid
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      console.log(Cell());
      grid[i].push(Cell());
    }
  }

  const placeMove = (i, j, currentPlayer) => {
    //If the move already has a token, return
    if (grid[i][j].getTokenType() !== 0) {
      alert("invalid move!");
      return 0;
    } else {
      //Place the token at (i,j)
      grid[i][j].setTokenType(currentPlayer.token);
      return 1;
    }
  };

  //Check if a move of the current player is a winning move, placed at (i,j).
  const checkWinningMove = (currentPlayer) => {
    //checks straights
    for (let i = 0; i < rows; i++) {
      let streakV = 0,
        streakH = 0;

      for (let j = 0; j < cols; j++) {
        if (grid[i][j].getTokenType() === currentPlayer.token) streakH++;
      }

      for (let j = 0; j < cols; j++) {
        if (grid[j][i].getTokenType() === currentPlayer.token) streakV++;
      }

      if (streakV == 3 || streakH == 3) {
        console.log("Straights");
        return 1;
      }
    }

    //Checks the 2 diagonals
    if (grid[1][1].getTokenType() === currentPlayer.token) {
      if (
        (grid[0][0].getTokenType() == grid[1][1].getTokenType() &&
          grid[2][2].getTokenType() == grid[1][1].getTokenType()) ||
        (grid[0][2].getTokenType() == grid[1][1].getTokenType() &&
          grid[2][0].getTokenType() == grid[1][1].getTokenType())
      ) {
        console.log("Diagonals");
        return 1;
      }
    }

    return 0;
  };

  const checkVisited = (i, j) => {
    grid[i][j].getTokenType != 0;
  };

  return {
    grid,
    checkVisited,
    checkWinningMove,
    placeMove,
    getRows,
    getCols,
  };
})();

const displayController = (function () {
  const print = (board) => {
    let rows = board.getRows();
    let cols = board.getCols();
    let grid = board.grid;

    console.log(rows + " and " + cols);
    for (let i = 0; i < rows; i++) {
      let row = "";
      for (let j = 0; j < cols; j++) {
        if (grid[i][j].getTokenType() === 0) row += " ";
        else row += grid[i][j].getTokenType();
        row += "|";
      }
      console.log(row);
      console.log("---------");
    }
  };

  return { print };
})();

//Contains information of each cell--
// {tokenType}, 0 : unvisited, 1 : "X", 2: "O"
function Cell() {
  let tokenType = 0;

  //Gets visited & token type
  const getTokenType = () => tokenType;
  //Sets visited & token types
  const setTokenType = (type) => (tokenType = type);

  return { getTokenType, setTokenType };
}

const userInput = (function () {
  let name1 = "",
    name2 = "";

  name1 = prompt("Name for player 1");
  name2 = prompt("Name for player 2");

  const getName1 = () => name1;

  const getName2 = () => name2;

  return { getName1, getName2 };
})();

const gameController = (function () {
  let board = gameBoard;
  let winner = null;
  const user = userInput;
  let display = displayController;

  //Put user inputted names later
  let players = [
    { name: user.getName1(), playerNumber: 1, token: "X" },
    { name: user.getName2(), playerNumber: 2, token: "O" },
  ];

  console.log(user.getName1);

  let currentPlayer = players[0];

  const getCurrentPlayer = () => currentPlayer;
  const getCurrentPlayerNumber = () => currentPlayer.playerNumber;

  const switchTurns = (oldPlayer) => {
    currentPlayer = oldPlayer === players[0] ? players[1] : players[0];
  };

  const currentRound = () => {
    // console.log(currentPlayer);
    //Get's the current player's to do a turn.

    let input = prompt(
      `It is Player ${getCurrentPlayerNumber()}: ${
        getCurrentPlayer().name
      }'s turn!`
    );

    input = input.split(" ");

    let [i, j] = [input[0], input[1]];

    console.log(input);

    //Switch turns if the move is not invalid
    if (board.placeMove(i, j, currentPlayer) !== 0) {
      //Display the board
      display.print(board);

      //Then check if winning move
      if (board.checkWinningMove(currentPlayer) === 1) {
        winner = currentPlayer;
        console.log(currentPlayer + " has won!~");
        return;
      }
      switchTurns(getCurrentPlayer());
    }

    //Then get the others players' turn
    currentRound();
  };

  currentRound();

  return {
    board,
    winner,
    players,
    getCurrentPlayer,
    currentRound,
    getCurrentPlayerNumber,
  };
})();
