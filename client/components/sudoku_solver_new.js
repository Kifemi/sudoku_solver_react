const POSSIBLE_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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

export function getPeers(i, j) {
  let peers = [];
  for (let n = 0; n < 9; n++) {
    //Adding the peers from the selected row
    if(n !== i) {
      peers.push({
        i: n,
        j,
      });
    };
    //Adding the peers from the selected column
    if(n !== j) {
      peers.push({
        i,
        j: n,
      });
    };
  };
  //Adding the peers from the selected square
  let topLeftRow = Math.floor(i / 3) * 3;
  let topLeftCol = Math.floor(j / 3) * 3;

  for (let n = topLeftRow; n < topLeftRow + 3; n++) {
    for (let m = topLeftCol; m < topLeftCol + 3; m++) {
      if((i === n) && (j === m)) {
        continue;
      }
      peers.push({
        i: n,
        j: m,
      });
    };
  };
  
  return peers;
}

export default { sudokuToArrays, getPeers };