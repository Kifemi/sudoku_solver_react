import React, { Component } from 'react';

import SudokuTile from './sudoku_tile';
import '../styles/sudoku_board.css';

class SudokuBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //Creates Array [1,2,....,8,9]
      row: Array.from(Array(9).keys(), x => ++x),
      //Creates empty 9x9 array
      //board: Array.from(Array(9).fill(Array.from(Array(9).fill("")))),
      board: Array.from(Array(81).fill("")),
      selectedTile: ""
    }
  }

  //Generates one row of sudoku tiles
  generateSudokuRow(column) { 
    return this.state.row.map((tile) => {
      //Gives unique id from 1 to 81 for each tile
      var id = tile + 9 * (column -1);
      var value = this.state.board[id - 1];
      //Checks if the tile is selected
      if(id == this.state.selectedTile) {
        var isSelected = true;
      }
      return (
        <SudokuTile key={id} id={id} tileSelector={this.handleTileSelection} 
          isSelected={isSelected} value={value}/>
      );
    });
  }

  //Generates the full sudoku board
  generateSudokuBoard() {
    return this.state.row.map((tile) => {
      return (
        <div className='row' key={tile}>
          {this.generateSudokuRow(tile)}
        </div>
      );
    });
  }

  //Saves the selected tile's id and clears the selected number 
  handleTileSelection = (selectedTile) => {
    this.setState({selectedTile: selectedTile});       
  }

  printTile() {
    console.log(this.state.board);
  }

  addNumberToBoard() {
    var boardCopy = Array.from(this.state.board);    
    if(this.props.selectedNumber == 10) {
      boardCopy[this.state.selectedTile - 1] = "";
    } else {
      boardCopy[this.state.selectedTile - 1] = this.props.selectedNumber;
    }
    this.setState({board: boardCopy}, this.printTile);
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
        {this.generateSudokuBoard()}  
      </div>
    );
  }
}

export default SudokuBoard;