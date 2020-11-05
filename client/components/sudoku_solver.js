//import React, { Component } from 'react';

export function checkDublicates(board, selectedTile) {
  console.log(selectedTile);
  if(selectedTile.row !== "" && selectedTile.col !== "") {
    getRowColumnSquare(board, selectedTile);
  }
}

function getRowColumnSquare(board, selectedTile) {
  let row = [];
  let column = [];
  let square = [];

  board.rows[selectedTile.row - 1].columns.map(cell => {
    row.push(cell.value);
  });

  board.rows.map(row => {
    column.push(row.columns[selectedTile.col - 1].value);
  });

  let squareVertical = Math.floor((selectedTile.row - 1) % 3);
  let squareHorizontal = Math.floor((selectedTile.col - 1) % 3);

  board.rows.map(row => {
    row.columns.map(cell => {
      if(Math.floor((cell.row - 1) % 3 === squareVertical) && Math.floor((cell.column - 1) % 3 === squareHorizontal)) {
        console.log(cell.row);
        console.log(cell.column);
        square.push(cell.value);
      };
    });
  });

  console.log(row);
  console.log(column);
  console.log(square);
}






























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

export default { checkDublicates };