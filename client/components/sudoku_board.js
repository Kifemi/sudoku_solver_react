import React, { Component } from 'react';

import SudokuTile from './sudoku_tile';
import { arrangeBoardData } from './sudoku_solver';
import '../styles/sudoku_board.css';


class SudokuBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: this.InitializeSudokuBoard(),
      selectedTile: { row: "", col: "" },
      error: false
    }

    // this.state = {
    //   //Creates Array [1,2,....,8,9]
    //   row: Array.from(Array(9).keys(), x => ++x),
    //   //board: Array.from(Array(9).fill(Array.from(Array(9).fill(""))))
    //   //Creates empty array of length 81
    //   board: Array.from(Array(81).fill("")),
    //   selectedTile: "",
    //   error: false
    // }
  }

  //Generates one row of sudoku tiles
  // generateSudokuRow(column) {
  //   return this.state.row.map((tile) => {
  //     //Gives unique id from 1 to 81 for each tile
  //     var id = tile + 9 * (column -1);
  //     var value = this.state.board[id - 1];
  //     //Checks if the tile is selected
  //     // if(id == this.state.selectedTile) {
  //     //   var isSelected = true;
  //     // } else if(id == this.state.selectedTile && this.state.error === true) {
  //     //   console.log("BLOP")
  //     //   var error = true;
  //     // }
  //     if(id == this.state.selectedTile && this.state.error === true) {
  //       var error = true;
  //     } else if(id == this.state.selectedTile) {
  //       var isSelected = true;
  //     }
  //     return (
  //       <SudokuTile key={id} id={id} tileSelector={this.handleTileSelection} 
  //         isSelected={isSelected} error={error} value={value}/>
  //     );
  //   });
  // }

  //Generates the full sudoku board
  // generateSudokuBoard() {
  //   return this.state.row.map((tile) => {
  //     return (
  //       <div className='row' key={tile}>
  //         {this.generateSudokuRow(tile)}
  //       </div>
  //     );
  //   });
  // }

  generateSudokuBoardNew(board) {
    return <div>
      {board.rows.map(row => (
        <div className='row' key={row.rowIndex}>
          {row.columns.map((cell) => (          
            <SudokuTile key={cell.column} tileSelector={this.handleTileSelection} 
            cell={cell} selectedTile={this.state.selectedTile}/>
         ))}
        </div>
      ))} 
    </div>
  }

  InitializeSudokuBoard() {
    const board = { rows: []};

    for (let i=0; i<9; i++) {
      const row = { columns: [], rowIndex: i + 1};
      for (let j=0; j<9; j++) {
        const cell = {
          row: i + 1,
          column: j + 1,
          value: ""
        };
        row.columns.push(cell);
      };
      board.rows.push(row);
    };
    return board;
  };

  //Saves the selected tile's id and clears the selected number 
  handleTileSelection = (selectedTile) => {
    let newTile = { row: selectedTile.row, col: selectedTile.column };
    this.setState({selectedTile: newTile});       
  }

  printTile() {
    //console.log(this.state.board);
    console.log(this.state.selectedTile);
  }

  addNumberToBoard() {
    var boardCopy = Array.from(this.state.board);    
    if(this.props.selectedNumber == 10) {
      boardCopy[this.state.selectedTile - 1] = "";
    } else {
      boardCopy[this.state.selectedTile - 1] = this.props.selectedNumber;
    }
    //this.setState({board: boardCopy}, this.arrangeBoardData);
    this.checkDublicates(boardCopy);
  }

  checkDublicates(board) {
    var result = arrangeBoardData(board);
    if(result[0]) {
      this.setState({board: board, error: false});
    } else {
      this.setState({error: true});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(((prevState.selectedTile != this.state.selectedTile) || (prevProps.selectedNumber !== this.props.selectedNumber)) 
      && ((this.state.selectedTile !== "") && (this.props.selectedNumber !== "") 
      && (this.state.board[this.state.selectedTile - 1] !== this.props.selectedNumber))) {
      this.addNumberToBoard();
    }
    if(this.props.selectedNumber !== "") {
      this.props.clearNumber();
    }
  }

  render() {
    return(
      <div>
        {this.generateSudokuBoardNew(this.state.board)}          
      </div>
    );
  }
}

export default SudokuBoard;