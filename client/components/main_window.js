import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import SudokuBoard from './sudoku_board';
import SudokuButtons from './sudoku_buttons';

import { Puzzles } from '../../imports/collections/sudoku_puzzles';

class MainWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNumber: "",
      selectedPuzzle: Array.from({length:81}, () => "")
    };
  }

  
  handleNumberSelection = (selectedNumber) => {
    if(selectedNumber !== this.state.selectedNumber) {
      this.setState({ selectedNumber: selectedNumber });
    }
  }

  printNumber() {
    //console.log(this.state.selectedNumber);
    console.log(this.state.selectedPuzzle);
    console.log(this.props.puzzles[0]);
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

  loadPuzzle = (event) => {
    this.setState({ selectedPuzzle: this.props.puzzles[0].layout });
    event.preventDefault;
  }

  render(){
    return(
      <div>
        <SudokuBoard selectedNumber={this.state.selectedNumber} clearNumber={this.clearSelectedNumber} puzzle={this.state.selectedPuzzle} />
        <SudokuButtons numberSelector={this.handleNumberSelection} clearTile={this.clearTile} loadPuzzle={this.loadPuzzle} />
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('puzzles');

  return { puzzles: Puzzles.find({}).fetch() };
})(MainWindow);