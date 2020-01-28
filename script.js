let Game = new class {
  board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ];

  gameRound = 0;
  player1 = "X";
  player2 = "O";
  currentPlayer = this.player1;

  gameReset = (tie) => {
    let h2 = document.querySelector("h2");
    if (!tie) {
      h2.textContent = `The winner is ${this.currentPlayer}`;
    } else {
      h2.textContent = `Tie`;
    }
    this.board = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "]
    ];
    this.currentPlayer = "X";
    this.gameRound = 0;
    minimax();
    Game.currentPlayer = "O";
  }

  checkBoard = () => {
    let gameWin = false

    //COLUMNS
    if (this.board[0][0] === this.board[0][1] && this.board[0][0] === this.board[0][2] && this.board[0][0] !== " ") {
      gameWin = true
    } else if (this.board[1][0] === this.board[1][1] && this.board[1][0] === this.board[1][2] && this.board[1][0] !== " ") {
      gameWin = true
    } else if (this.board[2][0] === this.board[2][1] && this.board[2][0] === this.board[2][2] && this.board[2][0] !== " ") {
      gameWin = true
    }

    //ROWS
    if (this.board[0][0] === this.board[1][0] && this.board[0][0] === this.board[2][0] && this.board[0][0] !== " ") {
      gameWin = true
    } else if (this.board[0][1] === this.board[1][1] && this.board[0][1] === this.board[2][1] && this.board[0][1] !== " ") {
      gameWin = true
    } else if (this.board[0][2] === this.board[1][2] && this.board[0][2] === this.board[2][2] && this.board[0][2] !== " ") {
      gameWin = true
    }

    //DIAGONALS  
    if (this.board[0][0] === this.board[1][1] && this.board[0][0] === this.board[2][2] && this.board[0][0] !== " ") {
      gameWin = true
    } else if (this.board[0][2] === this.board[1][1] && this.board[0][2] === this.board[2][0] && this.board[0][2] !== " ") {
      gameWin = true
    }

    return gameWin;

  }

  checkWinner = function () {
    let winner = this.checkBoard();

    if (winner) {
      this.gameReset(false);
    } else if (this.gameRound === 9) {
      this.gameReset(true);
    }


    if (winner || this.gameRound === 9) {
      return true;
    }

  }

  boardPosition = (x, y) => {

    let w = width / 3;
    let h = height / 3;
    let position = [];

    position.push(floor(x / w));
    position.push(floor(y / h));
    return position;

  }

}

function setup() {
  createCanvas(400, 400);
  createElement("h2", `There is no winner yet.`);
  minimax();
  Game.currentPlayer = "O";
}

function mousePressed() {

  let position = Game.boardPosition(mouseX, mouseY);
  if (Game.board[position[0]][position[1]] === " ") {
    Game.board[position[0]][position[1]] = Game.currentPlayer;
    Game.gameRound++;
    let gameEnded = Game.checkWinner();
    if (!gameEnded) {
      Game.currentPlayer = "X";
      minimax();
      Game.checkWinner();
      Game.currentPlayer = "O";
    }
  }
}

function draw() {
  background(220);
  let w = width / 3;
  let h = height / 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let x = w * (i);
      let y = h * (j);
      textSize(180);
      fill(0, 0, 255);
      text(Game.board[i][j], x, h * (1 + j));
      noFill();
      rect(x, y, w, w);
      stroke(0)
    }
  }

}
