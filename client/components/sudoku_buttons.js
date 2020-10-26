import React, { Component } from 'react';

import SudokuButton from './sudoku_button';

class SudokuButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberButtons: Array.from(Array(9).keys(), x => ++x),
    }
  }

  generateNumberButtons() {
    return this.state.numberButtons.map(number => {
      return(
        <SudokuButton key={number} buttonNumber={number} numberSelector={this.props.numberSelector}/>
      );     
    });
  }

  render() {
    return(
      <div>
        <div className='row'>
          {this.generateNumberButtons()}
        </div>
        <div className='row'>
          <button className='clear-button justify-content-start' onClick={this.props.clearTile.bind(this)}>Clear Tile</button>
        </div>
      </div>
      
    );
  };
}

export default SudokuButtons;
