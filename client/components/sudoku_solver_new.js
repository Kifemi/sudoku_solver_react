export function sudokuToArrays(puzzle) {
  const sudoku = [[], [], [], [], [], [], [], [], []];

  puzzle.rows.map((row) => {
    row.columns.map((cell) => {
      let value = null;
      if(cell.value !== null) {
        value = cell.value;
      };
      sudoku[row.rowIndex - 1].push(value);
    });
  });

  return sudoku;
}

export function solutionToArray(solution) {
  let solutionArray = [];
  for(var row of solution) {
    solutionArray = solutionArray.concat(row);
  };
  return solutionArray;
}

export function getPeers(row, col) {
  let peers = [];
  for (let i = 0; i < 9; i++) {
    //Adding the peers from the selected row
    if(i !== row) {
      peers.push({
        row: i,
        col,
      });
    };
    //Adding the peers from the selected column
    if(i !== col) {
      peers.push({
        row,
        col: i,
      });
    };
  };
  //Adding the peers from the selected square
  let topLeftRow = Math.floor(row / 3) * 3;
  let topLeftCol = Math.floor(col / 3) * 3;

  for (let i = topLeftRow; i < topLeftRow + 3; i++) {
    for (let j = topLeftCol; j < topLeftCol + 3; j++) {
      if((row === i) && (col === j)) {
        continue;
      }
      peers.push({
        row: i,
        col: j,
      });
    };
  };
  
  return peers;
}

//Checks if the value in specified cell is valid corresponding to its piers
export function isCellValid(row, col, board) {
  let cellValue = board[row][col];
  //null values are always possible
  if(cellValue === null) {
    return true;
  };
  const peers = getPeers(row, col);
  //comparing the cell value to every peer to see if the value is already used
  peers.forEach(peer => {
    if(board[peer.row][peer.col] === cellValue) {
      return false;
    };
  });
  //value is not used in peers
  return true;
}

export function fillObviousValues(board) {
  const VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let boardCopy = JSON.parse(JSON.stringify(board));
  let remainingCells = [];
  let loopObviousValueSearch = true;
  while(loopObviousValueSearch) {
    loopObviousValueSearch = false;
    remainingCells = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        //skipping cells that already have a value
        if(boardCopy[i][j] !== null) {
          continue;
        };
        let peerValues = [];
        let peers = getPeers(i, j);
        //collecting all pier values
        peers.forEach(peer => {
          peerValues.push(boardCopy[peer.row][peer.col]);
        });
        //keeping only one copy of each value
        peerValues = Array.from(new Set(peerValues));
        //collecting the possible values
        const possibleValues = VALUES.filter(value => peerValues.indexOf(value) === -1);
        //if there are no possible values for the cell, then the puzzle is impossible
        if(possibleValues.length === 0) {
          console.log("Impossible puzzle");
          return [[], [], [], [], [], [], [], [], [], []];
        } else if(possibleValues.length === 1) {
          //filling the cell by only possible value
          boardCopy[i][j] = possibleValues[0];
          //new loop, since new value was added to a board
          loopObviousValueSearch = true;
        } else {
          remainingCells.push({
            i,
            j,
            possibleValues
          });
        };
      };
    };
  };
  
  return [remainingCells, boardCopy];
}

export function solveBacktracking(solution) {
  const remainingCells = solution[0];
  const board = solution[1];
  for (let n = 0; n < remainingCells.length; n++) {
    const { i, j, possibleValues } = remainingCells[n];
    let value = board[i][j];
    if(value === null) {
      value = possibleValues[0];
    } else if(possibleValues.indexOf(value) >= possibleValues.length - 1) {
      board[i][j] = null;
      n = n - 2;
      continue;
    } else {
      value = possibleValues(possibleValues.indexOf(value) + 1);
    };
    board[i][j] = value;

    if(!isCellValid(i, j, board)) {
      n--;
      continue;
    };
  };
  return solutionToArray(board);
}

export function solve(puzzle) {
  let sudoku = sudokuToArrays(puzzle);
  let solution = fillObviousValues(sudoku);
  //console.log(solution[0]);
  return solutionToArray(solution[1]);
  //return solveBacktracking(solution);
}

export default { sudokuToArrays, getPeers, isCellValid, fillObviousValues, solutionToArray, solve };