
// Conway rules, from Wikipedia

// Any live cell with fewer than two live neighbors dies, as if by under population.
// Any live cell with two or three live neighbors lives on to the next generation.
// Any live cell with more than three live neighbors dies, as if by overpopulation.
// Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.


// Live = 1, dead = 0

// let boardDiv = document.getElementById("board");

function createBoard() {
  const board = new Array(20);
  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(20);
  }
  return board;
}

// Sum values of 8 neighboring cells, as outlined above.
// if value in first array is 1, apply first three rules and set value in next board array.
// if value in first array is 0, apply fourth rule, and set value in next board array.

// update the boards
function updateBoards(board, nextBoard) {

let neighbors = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      let leftNeighborIndex,
        rightNeighborIndex,
        topNeighborIndex,
        bottomNeighborIndex;
      i === 0 ? leftNeighborIndex = board.length - 1 : leftNeighborIndex = i;
      i === board.length -1 ? rightNeighborIndex = 0 : rightNeighborIndex = i;
      j === 0 ? topNeighborIndex = board.length - 1 : topNeighborIndex = j;
      j === board.length -1 ? bottomNeighborIndex = 0 : bottomNeighborIndex = j;
      neighbors.push(board[leftNeighborIndex][topNeighborIndex]);
      neighbors.push(board[i][topNeighborIndex]);
      neighbors.push(board[rightNeighborIndex][topNeighborIndex]);
      neighbors.push(board[leftNeighborIndex][j]);
      neighbors.push(board[rightNeighborIndex][j]);
      neighbors.push(board[leftNeighborIndex][bottomNeighborIndex]);
      neighbors.push(board[i][bottomNeighborIndex]);
      neighbors.push(board[rightNeighborIndex][bottomNeighborIndex]);
      let sum = neighbors.reduce( (a, b) => a + b, 0);
      let numLiving = 0;
      if (board[i][j] === 0) {
        sum === 3 ? nextBoard[i][j] = 1 : nextBoard[i][j] = 0;
      } else {
        switch (sum) {
          case sum < 2:
            nextBoard[i][j] = 0;
            break;
          case sum === 2 || sum === 3:
            nextBoard[i][j] = 1;
            break;
          case sum > 3:
            nextBoard[i][j] = 0;
        }
        numLiving++;
      }

    }
  }
}

function renderBoard(board) {
  let html = "";
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
    html += `<div>${board[i][j]}</div>`;
    }
    html +=`<br/>`;
  }
  // return html;
  let boardDiv = document.getElementById("board");
  boardDiv.innerHTML = html;
}


function game() {
  const board = createBoard();
  const newBoard = createBoard();
  renderBoard(board);
  // set up some initial state;
  // keep updating boards;
  // give user a way to stop it

}

game();
