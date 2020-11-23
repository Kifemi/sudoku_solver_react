import React, { Component } from 'react';

import '../styles/sudoku_tile.css';

class SudokuTile extends Component { 

  checkRightBorder(cell, tile) {
    if((cell.column % 3 == 0) && (cell.column % 9 != 0)) {
      return true;
    } else {
      return false;
    };   
  }

  checkBottomBorder(cell) {
    if((cell.row % 3 == 0) && (cell.row % 9 != 0)) {
      return true;
    } else {
      return false;
    };
  }

  checkIfSelected(cell, tile) {
    if(cell.row === tile.row && cell.column === tile.col) {
      return true;
    } else {
      return false;
    };
  }

  checkError(cell, error, tile) {
    if(this.checkIfSelected(cell, tile) && error.errorFound) {
      return true;
    } else {
      return false;
    };
  }

  checkIfTileCausedError(cell, error) {
    for (let i = 0; i < error.errorCells.length; i++) {
      let errorTile = { row: error.errorCells[i].row, col: error.errorCells[i].column };
      if(this.checkIfSelected(cell, errorTile)) {
        return true;
      };
    };
    return false;
  }

  handleTileClick(event) {   
    this.props.tileSelector(this.props.cell);
    event.preventDefault();
  }

  render() {
    return(
      <div className={`tile 
        ${this.checkRightBorder(this.props.cell, this.props.selectedTile) ? "rightBorder" : ""} 
        ${this.checkBottomBorder(this.props.cell) ? "bottomBorder" : ""}
        ${this.checkIfSelected(this.props.cell, this.props.selectedTile) ? "selected" : ""} 
        ${this.checkError(this.props.cell, this.props.error, this.props.selectedTile) ? "incorrect" : ""} 
        ${this.checkIfTileCausedError(this.props.cell, this.props.error) ? "incorrect2" : ""} 
        ${this.props.cell.readOnly ? "readOnly" : ""} `} 
        onClick={this.handleTileClick.bind(this)}>
          
        {this.props.cell.value}
      </div>
    );
  };
}

export default SudokuTile;
