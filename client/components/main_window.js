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
    if(this.state.selectedTile !== "") {
      this.setState({selectedNumber: selectedNumber});
    }
  }

  // //Saves the selected tile's id and clears the selected number 
  // handleTileSelection = (selectedTile) => {
  //   if((selectedTile != this.state.selectedTile)) {
  //     this.setState({selectedTile: selectedTile, selectedNumber: ""});
  //   }    
  // }

  clearSelectedNumber = () => {
    this.setState({selectedNumber: ""});
  }

  // printNumber() {
  //   console.log(this.state.selectedNumber);
  // }

  render(){
    return(
      <div>
        <SudokuBoard selectedNumber={this.state.selectedNumber} clearNumber={this.clearSelectedNumber}/>
        <SudokuButtons numberSelector={this.handleNumberSelection} />
      </div>
    );
  }
}

export default MainWindow;