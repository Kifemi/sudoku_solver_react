import React, { Component } from 'react';

import SudokuButton from './sudoku_button';

class SudokuButtons extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     numberButtons: Array.from(Array(9).keys(), x => ++x),
  //   }
  // }

  generateNumberButtons() {
    const numberButtons = Array.from(Array(9).keys(), x => ++x);
    return numberButtons.map(number => (
        <SudokuButton key={number} buttonNumber={number} numberSelector={this.props.numberSelector}/>
    ));
  }

  render() {
    return(
      <div>
        <div className='row'>
          {this.generateNumberButtons()}
        </div>
        <div className='row'>
          <button className='clear-button justify-content-start' onClick={this.props.clearTile.bind(this)}>Clear Tile</button>
          {/* <button className='clear-button justify-content-start' onClick={this.props.loadPuzzle.bind(this)}>Load Puzzle</button> */}
          <button className='clear-button justify-content-start' onClick={this.props.clearBoard.bind(this)}>Clear Board</button>
          <button className='clear-button justify-content-start' onClick={this.props.solveSudoku.bind(this)}>Solve Sudoku</button>
          <button className='clear-button justify-content-start' onClick={this.props.pickRandomPuzzle.bind(this)}>Random Puzzle</button>
          <button className='clear-button justify-content-start' onClick={this.props.savePuzzle.bind(this)}>Save Puzzle</button>
        </div>
      </div>
      
    );
  };
}

export default SudokuButtons;
