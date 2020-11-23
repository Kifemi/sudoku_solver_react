import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import SudokuTile from './sudoku_tile';
import { errorChecker } from './sudoku_solver';
import '../styles/sudoku_board.css';

import { Puzzles } from '../../imports/collections/sudoku_puzzles';

class SudokuBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: this.InitializeSudokuBoard(this.props.puzzle),
      selectedTile: { row: "", col: "" },
      errorData: { errorFound: false, errorCells: [] }
    };
  }

  generateSudokuBoard(board) {
    return <div>
      {board.rows.map(row => (
        <div className='row' key={row.rowIndex}>
          {row.columns.map((cell) => (          
            <SudokuTile key={cell.column} tileSelector={this.handleTileSelection} 
            cell={cell} selectedTile={this.state.selectedTile} error={this.state.errorData} />
         ))}
        </div>
      ))} 
    </div>
  }

  InitializeSudokuBoard(puzzle) {
    console.log(puzzle);

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

  //Saves the selected tile's id and clears the selected number 
  handleTileSelection = (selectedTile) => {
    let newTile = { row: selectedTile.row, col: selectedTile.column };
    this.setState({ selectedTile: newTile, errorData: { errorFound: false, errorCells: [] } });       
  }

  printTile() {
    console.log(this.state.board);
    console.log(this.state.selectedTile);
  }

  addNumberToBoard() {
    let boardCopy = JSON.parse(JSON.stringify(this.state.board));
    let selectedRow = this.state.selectedTile.row - 1;
    let selectedCol = this.state.selectedTile.col - 1;

    if(this.props.selectedNumber == 10) {
      boardCopy.rows[selectedRow].columns[selectedCol].value = "";
    } else {
      boardCopy.rows[selectedRow].columns[selectedCol].value = this.props.selectedNumber;
    };

    if(errorChecker(boardCopy, this.state.selectedTile).errorFound) {
      this.setState({errorData: errorChecker(boardCopy, this.state.selectedTile)});
    } else {     
      this.setState({board: boardCopy, errorData: errorChecker(boardCopy, this.state.selectedTile)});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(((prevState.selectedTile != this.state.selectedTile) || (prevProps.selectedNumber !== this.props.selectedNumber)) 
      && ((this.state.selectedTile.row !== "") && (this.state.selectedTile.col !== "") && (this.props.selectedNumber !== "") 
      && (this.state.board.rows[this.state.selectedTile.row - 1].columns[this.state.selectedTile.col - 1].value !== this.props.selectedNumber))) {
      this.addNumberToBoard();
    };

    if(this.props.selectedNumber !== "") {
      this.props.clearNumber();
    };

    if(this.props.puzzle !== prevProps.puzzle) {
      this.setState({ board: this.InitializeSudokuBoard(this.props.puzzle) });
    }
  }

  render() {
    return(
      <div>
        {this.generateSudokuBoard(this.state.board)}          
      </div>
    );
  };
}

export default SudokuBoard;

// export default withTracker(() => {
//   //set up subscription
//   Meteor.subscribe('puzzles');
  
//   //return an object. Whatever we return will be sent to SudokuBoard as props.
//   return { puzzles: Puzzles.find({}).fetch() };
// })(SudokuBoard);