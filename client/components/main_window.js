import React, { Component } from 'react';

import SudokuBoard from './sudoku_board';
import SudokuButtons from './sudoku_buttons';

class MainWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTile: null,
      selectedNumber: null
    }
  }

  handleNumberSelection = (selectedNumber) => {
    this.setState({selectedNumber: selectedNumber}, this.printNumber);
  }

  handleTileSelection = (selectedTile) => {
    this.setState({selectedTile: selectedTile}, this.printTile);
  }

  printNumber() {
    console.log(this.state.selectedNumber);
  }

  printTile() {
    console.log(this.state.selectedTile);
  }

  render(){
    return(
      <div>
        <SudokuBoard tileSelector={this.handleTileSelection} />
        <SudokuButtons numberSelector={this.handleNumberSelection}/>
      </div>
    );
  }
}

export default MainWindow;