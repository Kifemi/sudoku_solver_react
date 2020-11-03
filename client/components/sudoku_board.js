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
  }

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
    console.log(this.state.board);
    console.log(this.state.selectedTile);
  }

  addNumberToBoard() {
    let boardCopy = JSON.parse(JSON.stringify(this.state.board));
    let selectedRow = this.state.selectedTile.row - 1;
    let selectedCol = this.state.selectedTile.col - 1;

    if(this.props.selectedNumber == 10) {
      boardCopy.rows[selectedRow].columns[selectedCol].value = "";
    } else {
      boardCopy.rows[selectedRow].columns[selectedCol].value = this.props.selectedNumber;
    }
    
    this.setState({board: boardCopy});
    //this.checkDublicates(boardCopy);
  }

  // checkDublicates(board) {
  //   var result = arrangeBoardData(board);
  //   if(result[0]) {
  //     this.setState({board: board, error: false});
  //   } else {
  //     this.setState({error: true});
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    //console.log(this.state.board.rows[this.selectedTile.row].columns[this.selectedTile.col].value);
    if(((prevState.selectedTile != this.state.selectedTile) || (prevProps.selectedNumber !== this.props.selectedNumber)) 
      && ((this.state.selectedTile.row !== "") && (this.state.selectedTile.col !== "") && (this.props.selectedNumber !== "") 
      && (this.state.board.rows[this.state.selectedTile.row - 1].columns[this.state.selectedTile.col - 1].value !== this.props.selectedNumber))) {
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