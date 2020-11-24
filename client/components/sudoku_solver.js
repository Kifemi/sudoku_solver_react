//import React, { Component } from 'react';

export function errorChecker(board, selectedTile) {
  let errorData = { errorFound: false, errorCells: [] };
  errorData.errorCells = errorData.errorCells.concat(checkRowDublicates(board, selectedTile)).concat(
    checkColumnDublicates(board, selectedTile)).concat(checkSquareDublicates(board, selectedTile));

  if(selectedTile.row !== "" && selectedTile.col !== "") {
    if(errorData.errorCells.length === 0) {
      //success
      return errorData;
    } else {
      //dublicate numbers found
      errorData.errorFound = true;
      //errorData.errorCells.push(getSelectedCell(board, selectedTile));      
      return errorData;
    }
  }
}

// function getSelectedCell(board, selectedTile) {
//   let cell = board.rows[selectedTile.row - 1].columns[selectedTile.col - 1];
//   return cell;
// }


//Extracts the non-empty values from the selected row and checks if there are dublicate values
function checkRowDublicates(board, selectedTile) {
  let row = [];
  let rowValues = [];
  board.rows[selectedTile.row - 1].columns.map(cell => {
    if(cell.value !== null) {
      row.push(cell);
      rowValues.push(cell.value);
    };
  });

  return checkDublicates(row, rowValues, selectedTile);
}

//Extracts the non-empty values from the selected column and checks if there are dublicate values
function checkColumnDublicates(board, selectedTile) {
  let column = [];
  let columnValues = [];

  board.rows.map(row => {
    if(row.columns[selectedTile.col - 1].value !== null) {
      column.push(row.columns[selectedTile.col - 1]);
      columnValues.push(row.columns[selectedTile.col - 1].value);
    };
  });

  return checkDublicates(column, columnValues, selectedTile);
}

//Extracts the non-empty values from the selected square and checks if there are dublicate values
function checkSquareDublicates(board, selectedTile) {
  let square = [];
  let squareValues = [];
  let squareVertical = Math.floor((selectedTile.row - 1) / 3);
  let squareHorizontal = Math.floor((selectedTile.col - 1) / 3);

  board.rows.map(row => {
    row.columns.map(cell => {     
      if((Math.floor((cell.row - 1) / 3) === squareVertical) && (Math.floor((cell.column - 1) / 3) === squareHorizontal)) {
        if(cell.value !== null) {
          square.push(cell);
          squareValues.push(cell.value);
        };
      };
    });
  });

  return checkDublicates(square, squareValues, selectedTile);
}

//Checks if array has dublicate values
function checkDublicates(array, arrayValues, selectedTile) {
  let errorCells = [];
  if(new Set(arrayValues).size !== arrayValues.length) {
    errorCells = errorCells.concat(findDublicates(array, selectedTile));
  }
  return errorCells;
}

//Returns list of cells that had the same value as the selected tile
function findDublicates(array, selectedTile) {
  let errorCells = [];
  for(let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      //Checking if the values are same, but locations are different
      if((i !== j) && (array[i].value === array[j].value)) {
        //Excluding the selected tile
        if((array[i].row !== selectedTile.row) || (array[i].column !== selectedTile.col)) {
          errorCells.push(array[i]);
          return errorCells;
        }
      }
    };
  };

  return errorCells;
}

export function isPuzzleViable(board) {
  let puzzleViable = true;
  board.rows.map((row) => {
    row.columns.map((cell) => {
      let selectedTile = { row: cell.row, col: cell.column };
      if(errorChecker(board, selectedTile).errorFound) {
        puzzleViable = false;
      };
    });
  });
  return puzzleViable;
};

export default { errorChecker, isPuzzleViable };