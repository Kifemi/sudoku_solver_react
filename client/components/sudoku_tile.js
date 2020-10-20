import React, { Component } from 'react';

import '../styles/sudoku_tile.css';

class SudokuTile extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      rightBorderBold: false,
      bottomBorderBold: false
    }
  }

  checkRightBorder(id) {
    if((id % 3 == 0) && (id % 9 != 0)) {
      this.setState({
        rightBorderBold: true
      });
    }
  }

  checkBottomBorder(id) {
    if((id > 18 && id < 28) || (id > 45 && id < 55)) {
      this.setState({
        bottomBorderBold: true
      });
    }
  }

  componentDidMount() {
    this.checkRightBorder(this.props.id);
    this.checkBottomBorder(this.props.id);
  }

  render() {
    return(
      <div className={`tile ${this.state.rightBorderBold ? "rightBorder" : ""} ${this.state.bottomBorderBold ? "bottomBorder" : ""}`}></div>
    );
  };
}

export default SudokuTile;
