import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
//for testing purposes
import { makepuzzle } from "sudoku";

import SudokuBoard from './sudoku_board';
import SudokuButtons from './sudoku_buttons';
import SudokuList from './sudoku_list';
import { errorChecker, isPuzzleViable, solveSudoku } from './sudoku_solver';
import { sudokuToArrays, getPeers, isTileValid, fillObviousValues, solutionToArray, solve } from './sudoku_solver_new';

import { Puzzles } from '../../imports/collections/sudoku_puzzles';

class MainWindow extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selectedNumber: "",
      selectedPuzzle: this.loadEmptyBoard(),
    };
  }

  //Creates a object which holds all of the information from the sudoku board. 
  loadSudokuBoard(puzzle) {
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

  loadEmptyBoard() {
    return this.loadSudokuBoard(Array.from({length:81}, () => null));
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

  clearBoard = () => {
    this.setState({ selectedPuzzle: this.loadEmptyBoard() });
  }

  clearSelectedNumber = () => {
    if(this.props.selectedNumber !== "") {
      this.setState({ selectedNumber: "" });
    }
  }

  // loadPuzzle = (puzzleID) => {
  //   let parsed = parseInt(puzzleID);
  //   if(isNaN(parsed)) {
  //     parsed = 22;
  //   };
  //   let puzzle = this.loadSudokuBoard(this.props.puzzles[parsed].layout);

  //   if(isPuzzleViable(puzzle)) {
  //     this.setState({ selectedPuzzle: puzzle })
  //   } else {
  //     console.log("Puzzle impossible")
  //   }
  //   //this.setState({ selectedPuzzle: this.InitializeSudokuBoard(this.props.puzzles[1].layout) });
  //   //event.preventDefault();
  // }

  solveSudoku = () => {
    //console.log(getPeers(3,5));
    //console.log(fillObviousValues(sudokuToArrays(this.state.selectedPuzzle))[1]);
    //console.log(solve(this.state.selectedPuzzle));
    // console.log(solve(this.state.selectedPuzzle));
    // console.log(this.InitializeSudokuBoard(solve(this.state.selectedPuzzle)));
    //this.setState({ selectedPuzzle: this.InitializeSudokuBoard(solve(this.state.selectedPuzzle)) });
    let solution = this.loadSudokuBoard(solve(this.state.selectedPuzzle));
    console.log(solution);

    if(isPuzzleViable(solution)) {
      console.log("Puzzle viable");
      this.setState({ selectedPuzzle: solution });
    };
    //console.log(isTileValid(1,1,sudokuToArrays(this.state.selectedPuzzle)));
    // let solution = JSON.parse(JSON.stringify(solveSudoku(this.state.selectedPuzzle)));
    // //this.setState({ selectedPuzzle: solution });
    // if(isPuzzleViable(solution)) {
    //   //console.log("Puzzle viable");
    //   this.setState({ selectedPuzzle: solution });
    // };
  }

  pickRandomPuzzle = () => {
    // let randInt = this.getRandomInt(0, this.props.puzzles.length);
    // this.loadPuzzle(randInt);
    let puzzleRaw = makepuzzle();
    //increasing all the values, except nulls, by one
    puzzleRaw = puzzleRaw.map(value => {
      if(value === null) {
        return null;
      } else {
        return ++value;
      }
    });
    let puzzle = this.loadSudokuBoard(puzzleRaw);
    if(isPuzzleViable(puzzle)) {
      this.setState({ selectedPuzzle: puzzle })
    } else {
      console.log("Puzzle impossible")
    }
  }

  getRandomInt = (min, max) => {
    return (min + Math.floor(Math.random() * (max - min)));
  }

  getSelectedPuzzle = (puzzleId) => {
    let puzzle = this.props.puzzles.find(puzzle => puzzle._id == puzzleId);
    if(puzzle) {
      return puzzle;
    } else {
      return null;
    }
  }

  handlePuzzleClick = (puzzleId) => {
    let puzzle = this.getSelectedPuzzle(puzzleId);
    if(puzzle) {
      this.setState({ selectedPuzzle: this.loadSudokuBoard(puzzle.layout) });
    } else {
      this.setState({ selectedPuzzle: this.loadEmptyBoard() });
    };
  }

  removePuzzle = (puzzle) => {
    Meteor.call('puzzles.remove', puzzle, (error) => {
      this.setState({ selectedPuzzle: this.loadEmptyBoard() });
    });
  }

  savePuzzle = () => {
    let puzzle = this.puzzleToArray(this.state.selectedPuzzle);
    let puzzleSet = new Set(puzzle);
    if(puzzleSet.size === 1 && puzzleSet.has(null)) {
      console.log("empty puzzle");
      return;
    }
    Meteor.call('puzzles.insert', puzzle);
  }

  puzzleToArray = (puzzle) => {
    let puzzleArray = [];
    puzzle.rows.map(row => {
      row.columns.map(cell => {
        puzzleArray.push(cell.value);
      });
    });
    return puzzleArray;
  }

  render(){
    return(
      <div className='row'>
        <div className='col board'>
          <SudokuBoard selectedNumber={this.state.selectedNumber} clearNumber={this.clearSelectedNumber} puzzle={this.state.selectedPuzzle} />
          <SudokuButtons numberSelector={this.handleNumberSelection} clearTile={this.clearTile} clearBoard={this.clearBoard} 
            loadPuzzle={this.loadPuzzle} solveSudoku={this.solveSudoku} pickRandomPuzzle={this.pickRandomPuzzle} 
            savePuzzle={this.savePuzzle} />
        </div>
        <div className='col-3 puzzleList'>
          <SudokuList puzzleList={this.props.puzzles} puzzleClick={this.handlePuzzleClick} removePuzzle={this.removePuzzle} />
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('puzzles');

  return { puzzles: Puzzles.find({}).fetch() };
})(MainWindow);