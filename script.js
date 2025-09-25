//Players are stored in objects

//Try to have little global code as possible~

//Our grid and where we place our moves.
const gameBoard = function () {
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

    console.log("Type:" + grid[i][j].getTokenType());
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

  const getGrid = (i, j) => grid[Number(i)][Number(j)].getTokenType();

  const clearGrid = function () {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j].setTokenType(0);
      }
    }
  };

  return {
    grid,
    checkWinningMove,
    placeMove,
    getRows,
    getCols,
    getGrid,
    clearGrid,
  };
};

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

const gameController = function () {
  let board = gameBoard();
  let winner = null;

  //Put user inputted names later
  let players = [
    { name: "kaiser", playerNumber: 1, token: "X", wins: 0 },
    { name: "rin", playerNumber: 2, token: "O", wins: 0 },
  ];

  let currentPlayer = players[0];

  const getCurrentPlayerName = () => currentPlayer.name;
  const getCurrentPlayer = () => currentPlayer;
  const getCurrentPlayerNumber = () => currentPlayer.playerNumber;

  const switchTurns = (oldPlayer) => {
    currentPlayer = oldPlayer === players[0] ? players[1] : players[0];
  };

  const currentRound = (i, j) => {
    //Switch turns if the move is not invalid
    if (board.placeMove(i, j, currentPlayer) === 1) {
      //Display the board
      // display.print(board);

      //Then check if winning move
      if (board.checkWinningMove(currentPlayer) === 1) {
        console.log(currentPlayer + " has won!~");

        winner = currentPlayer;
        incrementWin(currentPlayer);
        return;
      }
      switchTurns(getCurrentPlayer());
    }
  };

  const getPlayer1 = () => players[0];
  const getPlayer2 = () => players[1];

  const getWinner = () => winner;
  const getWinsOfPlayer = (player) => player.wins;
  const incrementWin = (player) => currentPlayer.wins++;
  const getGrid = (i, j) => board.getGrid(i, j);
  const clearGrid = (i, j) => board.clearGrid(i, j);

  const clearGame = function () {
    clearGrid();
    currentPlayer = players[0];
    winner = null;
  };

  return {
    board,
    winner,
    players,
    getPlayer1,
    getPlayer2,
    getCurrentPlayer,
    currentRound,
    getCurrentPlayerNumber,
    getCurrentPlayerName,
    getGrid,
    switchTurns,
    getWinner,
    getWinsOfPlayer,
    clearGrid,
    clearGame,
  };
};

const displayController = (function () {
  const game = gameController();
  const playerTurnText = document.querySelector(".current-turn");
  const playerName = playerTurnText.querySelector("span");
  const grid = document.querySelector(".grid");
  const cells = document.querySelectorAll(".cell");
  const restartButton = document.querySelector(".restart-button");

  const player1ScoreText = document.querySelector(".player1Score");
  const player2ScoreText = document.querySelector(".player2Score");

  let cnt = 0;
  //assign each cell with coordinate id's
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cells[cnt++].setAttribute("id", i + "," + j);
    }
  }

  const display = function () {
    playerTurnText.textContent = "Current turn: " + game.getCurrentPlayerName();
    player1ScoreText.textContent = "Wins: " + game.getPlayer1().wins;
    player2ScoreText.textContent = "Wins: " + game.getPlayer2().wins;

    cells.forEach((cell) => {
      let coords = cell.getAttribute("id").split(",");

      let [i, j] = [Number(coords[0]), Number(coords[1])];
      let currToken = game.getGrid(i, j);

      cell.textContent = currToken === 0 ? "" : currToken;
    });
  };

  cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      if (game.getWinner() === null) {
        let coords = e.target.id.split(",");
        let [i, j] = [Number(coords[0]), Number(coords[1])];

        game.currentRound(i, j);
        display();

        if (game.getWinner() !== null) {
          let winnerText = game.getWinner().name;
          playerTurnText.textContent = "Winner: " + winnerText;
        }
      }
    });
  });

  restartButton.addEventListener("click", (e) => {
    game.clearGame();
    display();
  });

  //Initial call
  display();

  return {};
})();
