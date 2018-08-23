
// Conway rules, from Wikipedia

// Any live cell with fewer than two live neighbors dies, as if by under population.
// Any live cell with two or three live neighbors lives on to the next generation.
// Any live cell with more than three live neighbors dies, as if by overpopulation.
// Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.


// Live = 1, dead = 0

// let boardDiv = document.getElementById("board");

function createBoard() {
  const board = new Array(60);
  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(60);
  }
  return board;
}

function clearBoard(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      board[i][j] = 0;
    }
  }
  renderBoard(board);
}

// Sum values of 8 neighboring cells, as outlined above.
// if value in first array is 1, apply first three rules and set value in next board array.
// if value in first array is 0, apply fourth rule, and set value in next board array.

// update the boards
function updateBoard(board) {

// console.log("update running");
const nextBoard = createBoard();

let neighbors = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      let leftNeighborIndex,
        rightNeighborIndex,
        topNeighborIndex,
        bottomNeighborIndex;
      i === 0 ? topNeighborIndex = board.length - 1 : topNeighborIndex = i - 1;
      i === board.length - 1 ? bottomNeighborIndex = 0 : bottomNeighborIndex = i + 1;
      j === 0 ? leftNeighborIndex = board.length - 1 : leftNeighborIndex = j - 1;
      j === board.length - 1 ? rightNeighborIndex = 0 : rightNeighborIndex = j + 1;
      neighbors.push(board[topNeighborIndex][leftNeighborIndex]);
      neighbors.push(board[topNeighborIndex][j]);
      neighbors.push(board[topNeighborIndex][rightNeighborIndex]);
      neighbors.push(board[i][leftNeighborIndex]);
      neighbors.push(board[i][rightNeighborIndex]);
      neighbors.push(board[bottomNeighborIndex][leftNeighborIndex]);
      neighbors.push(board[bottomNeighborIndex][j]);
      neighbors.push(board[bottomNeighborIndex][rightNeighborIndex]);
      let sum = neighbors.reduce( (a, b) => a + b, 0);
      if (board[i][j] === 1) {
       // console.log(`i is ${i} and j is ${j}`);
       // console.log(`indices are (l, r, t, b): ${leftNeighborIndex},
       // ${rightNeighborIndex}, ${topNeighborIndex}, ${bottomNeighborIndex}`);
       // console.log(neighbors);
       // console.log(sum);
       // console.log(board[i][j]);
      }
      let numLiving = 0;
      if (board[i][j] === 0) {
        sum === 3 ? nextBoard[i][j] = 1 : nextBoard[i][j] = 0;
      } else {
        switch (sum) {
          case 0: case 1:
            nextBoard[i][j] = 0;
            break;
          case 2: case 3:
            nextBoard[i][j] = 1;
            break;
          default:
            nextBoard[i][j] = 0;
        }
        // console.log(nextBoard[i][j]);
        numLiving++;
      }
      neighbors = [];
    }
  }
  // console.log(board[0][0]);
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      board[i][j] = nextBoard[i][j];
    }
  }
  // console.log(board[0][0]);

  renderBoard(board);
}

function populateRandomBoard(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      board[i][j] = Math.round(Math.random());
    }
  }
}

function renderBoard(board) {
  let html = "";
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === 0) {
        html += `<ul class="tile"></ul>`;
      } else {
        html += `<ul class="tile living"></ul>`;
      }
    }
    html +=`<br/>`;
  }
  // return html;
  let boardDiv = document.getElementById("board");
  boardDiv.innerHTML = html;
}



function populateCrazyBoard(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      board[i][j] = 0;
    }
  }

  board[5][3] = 1;
  board[5][4] = 1;
  board[5][7] = 1;
  board[5][8] = 1;
  board[5][9] = 1;
  board[4][6] = 1;
  board[3][4] = 1;
}

function startBoard(board) {
  let timer;
  let stopButton = document.getElementById('stop');
  timer = setInterval(() => updateBoard(board), 100);
  stopButton.addEventListener("click", () => {
    clearInterval(timer);
    console.log("it's stopping");
  });
}

function game() {
  const board = createBoard();
  const newBoard = createBoard();
  populateRandomBoard(board);
  // populateCrazyBoard(board);


  renderBoard(board);
  // setTimeout(() => updateBoard(board, newBoard), 1000);
  // setTimeout(() => updateBoard(board, newBoard), 1000);


  //
  // updateBoard(board, newBoard);
  // // for (let i = 0; i < 100; i++) {
  //   setInterval(() => updateBoard(board, newBoard), 100);
  // // }

  let startButton = document.getElementById('start');
  startButton.addEventListener("click", () => startBoard(board));

  let stepButton = document.getElementById('step');
  stepButton.addEventListener("click", () => updateBoard(board));

  let clearButton = document.getElementById('clear');
  clearButton.addEventListener("click", () => clearBoard(board));

  let resetButton = document.getElementById('reset');
  resetButton.addEventListener("click", () => {
    clearBoard(board);
    populateRandomBoard(board);
    renderBoard(board);
  });

  // startBoard(board);

}

game();
