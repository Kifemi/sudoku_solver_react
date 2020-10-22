import React, { Component } from 'react';

import SudokuTile from './sudoku_tile';
import '../styles/sudoku_board.css';

class SudokuBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      row: Array.from(Array(9).keys(), x => ++x)
    }
  }

  generateSudokuRow(column) {
    return this.state.row.map((tile) => {
      return (
        <SudokuTile key={tile + 9 * (column-1)} id={tile + 9 * (column-1)} tileSelector={this.props.tileSelector} 
        selectedTile={this.props.selectedTile} selectedNumber={this.props.selectedNumber}/>
      );
    });
  }

  generateSudokuBoard() {
    return this.state.row.map((tile) => {
      return (
        <div className='row' key={tile}>
          {this.generateSudokuRow(tile)}
        </div>
      );
    });
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