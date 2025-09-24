//Players are stored in objects

//Try to have little global code as possible~

//Our grid and where we place our moves.
const gameBoard = (function () {
  let rows = 3;
  let cols = 3;

  let grid = [];

  //Sets up our 3x3 grid
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      console.log(Cell());
      grid[i].push(Cell());
    }
  }

  //Validation check for board

  //(Thru our game controller, maybe collect (i,j), and check if cell at i, j is visited
  const checkVisited = (i, j) => {
    grid[i][j].visited;
  };

  return { grid, checkVisited };
})();

//Contains information of each cell--
// {visited, tokenType}
function Cell() {
  let visited = 0;
  let tokenType = 0;

  //Gets visited & token type
  const getTokenType = () => tokenType;
  const ifVisited = () => visited;

  //Sets visited & token types
  const setTokenType = (type) => (tokenType = type);
  const setVisited = () => (visited = 1);

  return { visited, tokenType };
}

const gameController = (function () {
  let board = gameBoard.grid;
  let winner = null;
  let players = [
    { name: "player1", token: "O" },
    { name: "player2", token: "X" },
  ];

  let currentPlayer = players[0];

  const getCurrentPlayer = () => currentPlayer;
  const switchTurns = (oldPlayer) => {
    currentPlayer = oldPlayer === players[0] ? players[1] : players[0];
    console.log(currentPlayer);
  };

  //Check if a move of the current player is a winning move, placed at (i,j).
  const checkWinMove = (i, j) => {
    // if(board[i][j].visited)
  };

  const currentRound = () => {
    // console.log(currentPlayer);
    //Get's the current player's to do a turn.
    let i, j;
    prompt(`It is ${getCurrentPlayer().name}'s turn!`, i, j);
    switchTurns(getCurrentPlayer());
    //Then check validity w/ check move
    //Then check if winning move
    //Then get the others players' turn
  };
  currentRound();
  currentRound();

  return { board, winner, players, getCurrentPlayer, currentRound };
})();
