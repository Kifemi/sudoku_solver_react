import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import SudokuBoard from './sudoku_board';
import SudokuButtons from './sudoku_buttons';
import { errorChecker, isPuzzleViable, solveSudoku } from './sudoku_solver';

import { Puzzles } from '../../imports/collections/sudoku_puzzles';

class MainWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNumber: "",
      selectedPuzzle: this.InitializeSudokuBoard(Array.from({length:81}, () => null))
    };
  }

  //Creates a object which holds all of the information from the sudoku board. 
  InitializeSudokuBoard(puzzle) {
    const board = { rows: []};

    for (let i=0; i<9; i++) {
      const row = { columns: [], rowIndex: i + 1};
      for (let j=0; j<9; j++) {
        let readOnly = false;
        if(puzzle[i*9 + j] !== null) {
          readOnly = true;
        }
        const cell = {
          row: i + 1,
          column: j + 1,
          value: puzzle[i*9 + j],
          readOnly: readOnly
        };
        row.columns.push(cell);
      };
      board.rows.push(row);
    };
    
    return board;
  };

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

  clearBoard = () => {
    this.setState({ selectedPuzzle: this.InitializeSudokuBoard(Array.from({length:81}, () => null)) });
  }

  clearSelectedNumber = () => {
    if(this.props.selectedNumber !== "") {
      this.setState({ selectedNumber: "" });
    }
  }

  loadPuzzle = (event) => {
    let puzzle = this.InitializeSudokuBoard(this.props.puzzles[0].layout);

    if(isPuzzleViable(puzzle)) {
      this.setState({ selectedPuzzle: puzzle })
    } else {
      console.log("Puzzle impossible")
    }
    //this.setState({ selectedPuzzle: this.InitializeSudokuBoard(this.props.puzzles[1].layout) });
    event.preventDefault();
  }

  solveSudoku = (event) => {
    solveSudoku(this.state.selectedPuzzle);
  }

  render(){
    return(
      <div>
        <SudokuBoard selectedNumber={this.state.selectedNumber} clearNumber={this.clearSelectedNumber} puzzle={this.state.selectedPuzzle} />
        <SudokuButtons numberSelector={this.handleNumberSelection} clearTile={this.clearTile} clearBoard={this.clearBoard} 
          loadPuzzle={this.loadPuzzle} solveSudoku={this.solveSudoku} />
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('puzzles');

  return { puzzles: Puzzles.find({}).fetch() };
})(MainWindow);