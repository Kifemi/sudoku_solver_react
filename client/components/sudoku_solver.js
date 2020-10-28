//import React, { Component } from 'react';

export function arrangeBoardData(board) {
  var numbers = Array.from(Array(81).keys());
  var boardRowIds = [[],[],[],[],[],[],[],[],[]];
  var boardColumnIds = [[],[],[],[],[],[],[],[],[]];
  var boardSquareIds = [[],[],[],[],[],[],[],[],[]];
  var boardRows = [[],[],[],[],[],[],[],[],[]];
  var boardColumns = [[],[],[],[],[],[],[],[],[]];
  var boardSquares = [[],[],[],[],[],[],[],[],[]];

  numbers.map(number => {
    var row = Math.floor(number / 9);
    var column = number % 9;
    boardRowIds[row][column] = number;
    boardColumnIds[column][row] = number;    
  });

  for(var i = 0; i < 9; i++) {
   [1,2,3,10,11,12,19,20,21].map(number => {
    boardSquareIds[i].push(number + 3 ** 3 * Math.floor(i/3) + 3 * (i % 3) - 1);
   });  
  }

  // console.log(boardRowIds)
  // console.log(boardColumnIds)
  // console.log(boardSquareIds);
  var i = 0;
  boardRowIds.map(array => {
    array.map(id => {
      if(board[id] !== "") {
        boardRows[i].push(board[id]);
      }
    });
    i++;
  });

  if(new Set(boardRows[0]).size !== boardRows[0].length) {
    console.log("ERROR: row contains dublicate numbers");
  }
}

export default { arrangeBoardData };