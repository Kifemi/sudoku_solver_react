import React, { Component } from 'react';

import SudokuBoard from './sudoku_board';
import SudokuButtons from './sudoku_buttons';

class MainWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNumber: ""
    }
  }

  
  handleNumberSelection = (selectedNumber) => {
    if(selectedNumber !== this.state.selectedNumber) {
      this.setState({ selectedNumber: selectedNumber });
    }
  }

  printNumber() {
    console.log(this.state.selectedNumber);
  }

  clearTile = (event) => {
    if(this.state.selectedTile !== "") {
      this.setState({ selectedNumber: 10 });
    }
    event.preventDefault();
  }

  clearSelectedNumber = () => {
    if(this.props.selectedNumber !== "") {
      this.setState({ selectedNumber: "" });
    }
  }


  render(){
    return(
      <div>
        <SudokuBoard selectedNumber={this.state.selectedNumber} clearNumber={this.clearSelectedNumber}/>
        <SudokuButtons numberSelector={this.handleNumberSelection} clearTile={this.clearTile} />
      </div>
    );
  }
}

export default MainWindow;