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
    if(this.state.selectedTile != null) {
      this.setState({selectedNumber: selectedNumber});
    }
  }

  handleTileSelection = (selectedTile) => {
    if(selectedTile != this.state.selectedTile) {
      this.setState({selectedTile: selectedTile}, this.clearSelectedNumber);
    }
  }

  clearSelectedNumber = () => {
    this.setState({selectedNumber: null});
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
        <SudokuBoard tileSelector={this.handleTileSelection} selectedTile={this.state.selectedTile} selectedNumber={this.state.selectedNumber}/>
        <SudokuButtons numberSelector={this.handleNumberSelection}/>
      </div>
    );
  }
}

export default MainWindow;