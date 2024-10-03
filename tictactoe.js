function GameBoard() {
  const board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

  const getBoard = () => board;

  const markSpot = (spot, token) => {
    board[spot] = token;
  };

  const printBoard = () => {
    console.log(board[0] + "|" + board[1] + "|" + board[2]);
    console.log("-----");
    console.log(board[3] + "|" + board[4] + "|" + board[5]);
    console.log("-----");
    console.log(board[6] + "|" + board[7] + "|" + board[8]);
  };

  return { getBoard, markSpot, printBoard };
}

function GameController() {
  const board = GameBoard();

  const players = [{ token: "X" }, { token: "O" }];

  let currentPlayer = players[0];

  const getCurToken = () => currentPlayer.token;

  function compareSpots(spot1, spot2, spot3) {
    return spot1 === spot2 && spot2 === spot3 && spot1 != " ";
  }

  const playRound = (spotNumber) => {
    board.markSpot(spotNumber, currentPlayer.token);

    board.printBoard();

    // Check for winner
    currentBoard = board.getBoard();
    if (
      compareSpots(currentBoard[0], currentBoard[1], currentBoard[2]) ||
      compareSpots(currentBoard[3], currentBoard[4], currentBoard[5]) ||
      compareSpots(currentBoard[6], currentBoard[7], currentBoard[8]) ||
      compareSpots(currentBoard[0], currentBoard[3], currentBoard[6]) ||
      compareSpots(currentBoard[1], currentBoard[4], currentBoard[7]) ||
      compareSpots(currentBoard[2], currentBoard[5], currentBoard[8]) ||
      compareSpots(currentBoard[0], currentBoard[4], currentBoard[8]) ||
      compareSpots(currentBoard[2], currentBoard[4], currentBoard[6])
    ) {
      console.log(currentPlayer.token + " is the winner!");
      return false;
    } else if (currentBoard.filter((item) => item != " ").length === 9) {
      console.log("Draw!");
      return false;
    }
    // Change players
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];

    return true;
  };

  const getPlayerChoice = () => {
    const input = prompt("What spot do you choose (0-8)?");

    return input;
  };

  return { playRound, getPlayerChoice, getCurToken };
}

function GameUI() {
  let game = GameController();

  function newClicked(event) {
    let game2 = GameController();
  }

  function spotClicked(event) {
    console.log(event.target);
    const choice = event.target.dataset.spotNum;
    const currentToken = game.getCurToken();
    console.log("Clicked on spot: " + choice);
    if (game.playRound(choice)) {
      const spot = document.querySelector("[data-spot-num='" + choice + "']");
      spot.textContent = currentToken;
      spot.removeEventListener("click", spotClicked);
    } else {
      const spot = document.querySelector("[data-spot-num='" + choice + "']");
      spot.textContent = currentToken;
    }
  }

  const newGame = () => {
    const newButton = document.querySelector("#startGame");
    newButton.addEventListener("click", newClicked);

    for (let i = 0; i < 9; i++) {
      const spot = document.querySelector("[data-spot-num='" + i + "']");
      spot.addEventListener("click", spotClicked);
    }
  };

  return { newGame };
}

let ui = GameUI();
ui.newGame();
