import React, { Component } from 'react';

import '../styles/sudoku_tile.css';

class SudokuTile extends Component { 

  checkRightBorder(cell) {
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

  checkIfSelected(cell) {
    if(cell.row == this.props.selectedTile.row && cell.column == this.props.selectedTile.col) {
      return true;
    } else {
      return false;
    };
  }

  handleTileClick(event) {   
    this.props.tileSelector(this.props.cell);
    event.preventDefault();
  }

  render() {
    return(
      <div className={`tile ${this.checkRightBorder(this.props.cell) ? "rightBorder" : ""} ${this.checkBottomBorder(this.props.cell) ? "bottomBorder" : ""}
        ${this.checkIfSelected(this.props.cell) ? "selected" : ""}`} onClick={this.handleTileClick.bind(this)}>
        {this.props.cell.value}
      </div>
    );
  };
}

export default SudokuTile;
