//import React, { Component } from 'react';

export function errorChecker(board, selectedTile) {
  let errorCells = [];
  errorCells = errorCells.concat(checkRowDublicates(board, selectedTile).errorCells);
  errorCells = errorCells.concat(checkColumnDublicates(board, selectedTile).errorCells);
  errorCells = errorCells.concat(checkSquareDublicates(board, selectedTile).errorCells);

  if(selectedTile.row !== "" && selectedTile.col !== "") {
    if(errorCells.length === 0) {
      //success
      return true;
    } else {
      //dublicate numbers found
      return false;
    }
  }
}

// function getSelectedValue(board, selectedTile) {
//   let value = board.rows[selectedTile.row - 1].columns[selectedTile.col - 1].value;
//   return value;
// }


//Extracts the non-empty values from the selected row
function checkRowDublicates(board, selectedTile) {
  let row = [];
  let rowValues = [];
  board.rows[selectedTile.row - 1].columns.map(cell => {
    if(cell.value !== "") {
      row.push(cell);
      rowValues.push(cell.value);
    };
  });

  return checkDublicates(row, rowValues);
}

//Extracts the non-empty values from the selected column
function checkColumnDublicates(board, selectedTile) {
  let column = [];
  let columnValues = [];

  board.rows.map(row => {
    if(row.columns[selectedTile.col - 1].value !== "") {
      column.push(row.columns[selectedTile.col - 1]);
      columnValues.push(row.columns[selectedTile.col - 1].value);
    };
  });

  return checkDublicates(column, columnValues);
}

//Extracts the non-empty values from the selected square
function checkSquareDublicates(board, selectedTile) {
  let square = [];
  let squareValues = [];
  let squareVertical = Math.floor((selectedTile.row - 1) / 3);
  let squareHorizontal = Math.floor((selectedTile.col - 1) / 3);

  board.rows.map(row => {
    row.columns.map(cell => {     
      if((Math.floor((cell.row - 1) / 3) === squareVertical) && (Math.floor((cell.column - 1) / 3) === squareHorizontal)) {
        if(cell.value !== "") {
          square.push(cell);
          squareValues.push(cell.value);
        };
      };
    });
  });

  return checkDublicates(square, squareValues);
}

//Checks if array has dublicate values
function checkDublicates(array, arrayValues) {
  let errors = { errorFound: false, errorCells: [] };
  if(new Set(arrayValues).size !== arrayValues.length) {
    errors.errorCells = errors.errorCells.concat(findDublicates(array));
    errors.errorFound = true;
  }
  return errors;
}

// function checkDublicates2(cellArray) {
//   let noError = true;
//   let errorCells = [];

//   cellArray.map(cell => {
//     cellArray.map(cellCompared => {
//       if((cell.value === cellCompared.value) && ((cell.row !== cellCompared.row) || (cell.column !== cellCompared.column))) {
//         errorCells.push(cell, cellCompared);
//         noError= false;
//       };
//     }); 
//   });
//   return [noError, errorCells];
// }

function findDublicates(array) {
  let errorCells = [];
  for(let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if((i !== j) && (array[i].value === array[j].value)) {
        errorCells.push(array[i], array[j]);
        return errorCells;
      }
    };
  };

  return errorCells;
}

export default { errorChecker };







// function getRowColumnSquare(board, selectedTile) {
//   let row = [];
//   let column = [];
//   let square = [];

//   board.rows[selectedTile.row - 1].columns.map(cell => {
//     row.push(cell.value);
//   });

//   board.rows.map(row => {
//     column.push(row.columns[selectedTile.col - 1].value);
//   });

//   let squareVertical = Math.floor((selectedTile.row - 1) / 3);
//   let squareHorizontal = Math.floor((selectedTile.col - 1) / 3);

//   board.rows.map(row => {
//     row.columns.map(cell => {     
//       if((Math.floor((cell.row - 1) / 3) === squareVertical) && (Math.floor((cell.column - 1) / 3) === squareHorizontal)) {
//         square.push(cell.value);
//       };
//     });
//   });

//   console.log(row);
//   console.log(column);
//   console.log(square);
// }





// export function arrangeBoardData(board) {
//   var numbers = Array.from(Array(81).keys());
//   var boardRowIds = [[],[],[],[],[],[],[],[],[]];
//   var boardColumnIds = [[],[],[],[],[],[],[],[],[]];
//   var boardSquareIds = [[],[],[],[],[],[],[],[],[]];
//   var boardRows = [[],[],[],[],[],[],[],[],[]];
//   var boardColumns = [[],[],[],[],[],[],[],[],[]];
//   var boardSquares = [[],[],[],[],[],[],[],[],[]];

//   numbers.map(number => {
//     var row = Math.floor(number / 9);
//     var column = number % 9;
//     boardRowIds[row][column] = number;
//     boardColumnIds[column][row] = number;    
//   });

//   for(var i = 0; i < 9; i++) {
//    [1,2,3,10,11,12,19,20,21].map(number => {
//     boardSquareIds[i].push(number + 3 ** 3 * Math.floor(i/3) + 3 * (i % 3) - 1);
//    });  
//   }

//   // console.log(boardRowIds)
//   // console.log(boardColumnIds)
//   // console.log(boardSquareIds);
//   var i = 0;
//   boardRowIds.map(array => {
//     array.map(id => {
//       if(board[id] !== "") {
//         boardRows[i].push(board[id]);
//       }
//     });
//     i++;
//   });

//   var i = 0;
//   boardColumnIds.map(array => {
//     array.map(id => {
//       if(board[id] !== "") {
//         boardColumns[i].push(board[id]);
//       }
//     });
//     i++;
//   });

//   var i = 0;
//   boardSquareIds.map(array => {
//     array.map(id => {
//       if(board[id] !== "") {
//         boardSquares[i].push(board[id]);
//       }
//     });
//     i++;
//   });

//   return checkDublicates(boardRows, boardColumns, boardSquares);
// }

// function checkDublicates(rows, columns, squares) {
//   for(var i = 0; i < 9; i++) {
//     if(new Set(rows[i]).size !== rows[i].length) {
//       console.log("ERROR: row contains dublicate numbers");
//       return [false, i];
//     }

//     if(new Set(columns[i]).size !== columns[i].length) {
//       console.log("ERROR: column contains dublicate numbers");
//       return [false, i];
//     }

//     if(new Set(squares[i]).size !== squares[i].length) {
//       console.log("ERROR: square contains dublicate numbers");
//       return [false, i];
//     }
//   }
//   return [true, 1];
// }

