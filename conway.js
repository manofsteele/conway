
// Conway rules, from Wikipedia

// Any live cell with fewer than two live neighbors dies, as if by under population.
// Any live cell with two or three live neighbors lives on to the next generation.
// Any live cell with more than three live neighbors dies, as if by overpopulation.
// Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.


// Live = 1, dead = 0

// let boardDiv = document.getElementById("board");
let numLiving = 0;
let numGenerations = 0;
let boardSize;
let staticGenerations = 0;
let percentage = 50;
let timer;


function createBoard() {
  const board = new Array(60);
  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(60);
  }
  boardSize = board.length * board.length;
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

let lastNumLiving = numLiving;
numLiving = 0;
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
        numLiving++;
      }
      neighbors = [];
    }
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      board[i][j] = nextBoard[i][j];
    }
  }
  numGenerations += 1;

  renderBoard(board);
  if (lastNumLiving === numLiving) {
    staticGenerations += 1;
    if (staticGenerations > 2) {
      let stopButton = document.getElementById('stop');
      stopButton.click();
      staticGenerations = 0;
    }
  } else {
    staticGenerations = 0;
  }
}

function populateRandomBoard(board, pct) {
  let rand;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      rand = Math.random();
      if (rand > pct/100) {
        board[i][j] = 0;
      } else {
        board[i][j] = 1;
      }
      // board[i][j] = Math.round(Math.random() * (2 * pct / 100));
    }
  }
  console.log(Math.round(Math.random() * (2 * pct / 100)));
  percentage = pct;
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
  html +=`<br/>`;
  let boardDiv = document.getElementById("board");
  boardDiv.innerHTML = html;
  html = "";
  html +=`<div class="stats">Number of living cells: ${numLiving}</br>`;
  html +=`Percentage of living cells: ${Math.round( (numLiving / boardSize) * 100 )}</br>`;
  html +=`Number of generations: ${numGenerations}<br/>`;
  html +=`Set percentage of squares living for new rounds:
  <input type="text" id="percentageInput"></input>`;
  html += `<button class="button" onClick="handlePercentageInput()">Submit</button></div><br/>`;
  document.getElementById("statsAndOptions").innerHTML = html;
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
  let stopButton = document.getElementById('stop');
  timer = setInterval(() => updateBoard(board), 50);
  stopButton.addEventListener("click", () => stopBoard(board));
}

function stopBoard(board) {
  clearInterval(timer);
}

function resetBoard(board) {
  clearBoard(board);
  populateRandomBoard(board, percentage);
  numGenerations = 0;
  numLiving = 0;
  renderBoard(board);
}

function handlePercentageInput() {
  let input = document.getElementById("percentageInput").value;
  if (input >= 0 && input <= 100) {
    percentage = input;
  }
}

function game() {
  const board = createBoard();
  const newBoard = createBoard();
  populateRandomBoard(board, percentage);
  // populateCrazyBoard(board);


  renderBoard(board);

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
  resetButton.addEventListener("click", () => resetBoard(board));

}

game();
