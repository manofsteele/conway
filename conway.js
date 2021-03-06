
// Conway rules, from Wikipedia

// Any live cell with fewer than two live neighbors dies, as if by under population.
// Any live cell with two or three live neighbors lives on to the next generation.
// Any live cell with more than three live neighbors dies, as if by overpopulation.
// Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.


function createBoard() {
  const grid = new Array(60);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(60);
  }
  let board = {
    grid: grid,
    numLiving: 0,
    numGenerations: 0,
    size: grid.length * grid.length,
    staticGenerations: 0,
    percentage: 50,
    timer: null
  };
  // size = board.grid.length * board.grid.length;
  return board;
}

// Populates a random selection of cells with a designated percentage 
// of "living" cells.

function populateRandomBoard(board, pct = 50) {
  let rand;
  for (let i = 0; i < board.grid.length; i++) {
    for (let j = 0; j < board.grid.length; j++) {
      rand = Math.random();
      if (rand > pct/100) {
        board.grid[i][j] = 0;
      } else {
        board.grid[i][j] = 1;
        board.numLiving += 1;
      }
    }
  }
  board.percentage = pct;
}

// This is not used for now; it is for implementation later, when it is 
// projected to add different starting configurations.

function populateAcornBoard(board) {
  for (let i = 0; i < board.grid.length; i++) {
    for (let j = 0; j < board.grid.length; j++) {
      board.grid[i][j] = 0;
    }
  }

  board.grid[5][3] = 1;
  board.grid[5][4] = 1;
  board.grid[5][7] = 1;
  board.grid[5][8] = 1;
  board.grid[5][9] = 1;
  board.grid[4][6] = 1;
  board.grid[3][4] = 1;
}

// Renders board based on which cells are living or dead. 

function renderBoard(board) {
  let html = "";
  for (let i = 0; i < board.grid.length; i++) {
    for (let j = 0; j < board.grid.length; j++) {
      if (board.grid[i][j] === 0) {
        html += `<ul class="tile"></ul>`;
      } else {
        html += `<ul class="tile living"></ul>`;
      }
    }
    html +=`<br/>`;
  }
  html +=`<br/>`;
  let boardDiv = document.getElementById("boardGrid");
  boardDiv.innerHTML = html;
  html = "";
  html +=`<div class="stats">Number of living cells: ${board.numLiving}</br>`;
  html +=`Percentage of living cells: ${Math.round( (board.numLiving / board.size) * 100 )}</br>`;
  html +=`Number of generations: ${board.numGenerations}<br/>`;
  document.getElementById("statsAndOptions").innerHTML = html;
}

// Determine configuration of next step in board's evolution.
// Sum values of 8 neighboring cells, as outlined above.
// if value in first array is 1, apply first three rules and set value in next board array.
// if value in first array is 0, apply fourth rule, and set value in next board array.


function updateBoard(board) {

let lastNumLiving = board.numLiving;
board.numLiving = 0;
const nextBoard = createBoard();

let neighbors = [];
  for (let i = 0; i < board.grid.length; i++) {
    for (let j = 0; j < board.grid.length; j++) {
      let leftNeighborIndex,
        rightNeighborIndex,
        topNeighborIndex,
        bottomNeighborIndex;
      i === 0 ? topNeighborIndex = board.grid.length - 1 : topNeighborIndex = i - 1;
      i === board.grid.length - 1 ? bottomNeighborIndex = 0 : bottomNeighborIndex = i + 1;
      j === 0 ? leftNeighborIndex = board.grid.length - 1 : leftNeighborIndex = j - 1;
      j === board.grid.length - 1 ? rightNeighborIndex = 0 : rightNeighborIndex = j + 1;
      neighbors.push(board.grid[topNeighborIndex][leftNeighborIndex]);
      neighbors.push(board.grid[topNeighborIndex][j]);
      neighbors.push(board.grid[topNeighborIndex][rightNeighborIndex]);
      neighbors.push(board.grid[i][leftNeighborIndex]);
      neighbors.push(board.grid[i][rightNeighborIndex]);
      neighbors.push(board.grid[bottomNeighborIndex][leftNeighborIndex]);
      neighbors.push(board.grid[bottomNeighborIndex][j]);
      neighbors.push(board.grid[bottomNeighborIndex][rightNeighborIndex]);
      let sum = neighbors.reduce( (a, b) => a + b, 0);

      if (board.grid[i][j] === 0) {
        sum === 3 ? nextBoard.grid[i][j] = 1 : nextBoard.grid[i][j] = 0;
      } else {
        switch (sum) {
          case 0: case 1:
            nextBoard.grid[i][j] = 0;
            break;
          case 2: case 3:
            nextBoard.grid[i][j] = 1;
            break;
          default:
            nextBoard.grid[i][j] = 0;
        }
        board.numLiving++;
      }
      neighbors = [];
    }
  }

  for (let i = 0; i < board.grid.length; i++) {
    for (let j = 0; j < board.grid.length; j++) {
      board.grid[i][j] = nextBoard.grid[i][j];
    }
  }

  board.numGenerations += 1;

  renderBoard(board);

  // Determine whether number of living tiles has changed in last two generations; 
  // If it hasn't, then stop the board. 

  if (lastNumLiving === board.numLiving) {
    board.staticGenerations += 1;
    if (board.staticGenerations > 2) {
      let stopButton = document.getElementById('stop');
      stopButton.click();
      board.staticGenerations = 0;
    }
  } else {
    board.staticGenerations = 0;
  }
}

function startBoard(board) {
  let stopButton = document.getElementById('stop');
  board.timer = setInterval(() => updateBoard(board), 50);
  stopButton.addEventListener("click", () => stopBoard(board));
}

function stopBoard(board) {
  clearInterval(board.timer);
}

function clearBoard(board) {
  for (let i = 0; i < board.grid.length; i++) {
    for (let j = 0; j < board.grid.length; j++) {
      board.grid[i][j] = 0;
    }
  }
  renderBoard(board);
}

function resetBoard(board) {
  clearBoard(board);
  populateRandomBoard(board, board.percentage);
  board.numGenerations = 0;
  board.numLiving = 0;
  renderBoard(board);
}

function handlePercentageInput(board) {
  let input = document.getElementById("percentageInput").value;
  if (input >= 0 && input <= 100) {
    board.percentage = input;
    stopBoard(board);
    resetBoard(board);
  }
}


function game() {
  const board = createBoard();
  const newBoard = createBoard();
  populateRandomBoard(board);

  // populateAcornBoard(board);

  renderBoard(board);

  let stepButton = document.getElementById('step');
  stepButton.addEventListener("click", () => updateBoard(board));

  let startButton = document.getElementById('start');
  startButton.addEventListener("click", () => startBoard(board));

  let clearButton = document.getElementById('clear');
  clearButton.addEventListener("click", () => clearBoard(board));

  let resetButton = document.getElementById('reset');
  resetButton.addEventListener("click", () => resetBoard(board));

  let percentageButton = document.getElementById('percentage');
  percentageButton.addEventListener("click", () => handlePercentageInput(board));

}

game();
