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
      board: this.props.puzzle,
      selectedTile: { row: "", col: "" },
      errorData: { errorFound: false, errorCells: [] }
    };
  }

  //Maps the board tile components for the rendering
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
    //Copying the board object
    let boardCopy = JSON.parse(JSON.stringify(this.state.board));
    let selectedRow = this.state.selectedTile.row - 1;
    let selectedCol = this.state.selectedTile.col - 1;

    //Clears the selected tile
    if(this.props.selectedNumber == 10) {
      boardCopy.rows[selectedRow].columns[selectedCol].value = null;
    } else {
      boardCopy.rows[selectedRow].columns[selectedCol].value = this.props.selectedNumber;
    };

    //Changes the value in a tile if there are no errors
    if(errorChecker(boardCopy, this.state.selectedTile).errorFound) {
      this.setState({errorData: errorChecker(boardCopy, this.state.selectedTile)});
    } else {     
      this.setState({board: boardCopy, errorData: errorChecker(boardCopy, this.state.selectedTile)});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //Adds new value to a tile, if possible
    if(((prevState.selectedTile != this.state.selectedTile) || (prevProps.selectedNumber !== this.props.selectedNumber)) 
      && this.addNumberChecker()) {
      this.addNumberToBoard();
    };

    //Clears the number selection
    if(this.props.selectedNumber !== "") {
      this.props.clearNumber();
    };

    //Changes the puzzle, if the user loads a new one
    if(this.props.puzzle !== prevProps.puzzle) {
      this.setState({ board: this.props.puzzle });
    }
  }

  addNumberChecker() {
    //returns true if tile is selected and the value of the tile would change and can be changed
    return ((this.state.selectedTile.row !== "") && (this.state.selectedTile.col !== "") && (this.props.selectedNumber !== "") 
          && (this.state.board.rows[this.state.selectedTile.row - 1].columns[this.state.selectedTile.col - 1].value !== this.props.selectedNumber)
          && (this.state.board.rows[this.state.selectedTile.row - 1].columns[this.state.selectedTile.col - 1].readOnly === false)); 
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