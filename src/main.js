const TicTacToe = (() => {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", ""];
  let isGameOver = false;
  const circles = document.querySelectorAll(".circle");

  function updateBackgroundColor() {
    const bodyElement = document.querySelector("body");
    if (currentPlayer === "X") {
      bodyElement.style.backgroundColor = "red";
    } else {
      bodyElement.style.backgroundColor = "blue";
    }
  }

  let moveCount = 0;

  function checkForWin() {
    for (let combination of winningCombos) {
      const [a, b, c] = combination;
      if (
        gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]
      ) {
        isGameOver = true;
        document.getElementById("message").textContent =
          currentPlayer + " Wins!";
        return;
      }
    }
  }

  function makeMove(index) {
    if (isGameOver || circles[index].textContent !== "") {
      return;
    }

    circles[index].textContent = currentPlayer;
    gameBoard[index] = currentPlayer;
    moveCount++;

    checkForWin();

    // Check for a tie
    if (!isGameOver && moveCount === 9) {
      document.getElementById("message").textContent = "It's a tie!";
      isGameOver = true;
      return;
    }

    if (!isGameOver) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateBackgroundColor();
    }
  }

  function restartGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameOver = false;
    moveCount = 0;
    circles.forEach((circle) => {
      circle.textContent = "";
    });
    document.getElementById("message").textContent = "";
    updateBackgroundColor();
  }

  function startupGame() {
    circles.forEach((circle, index) => {
      circle.addEventListener("click", () => makeMove(index));
    });

    document
      .getElementById("resetButton")
      .addEventListener("click", restartGame);
  }

  return {
    start: startupGame,
  };
})();

TicTacToe.start();

