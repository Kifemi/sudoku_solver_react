import React, { Component } from 'react';

import '../styles/sudoku_tile.css';

class SudokuTile extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      rightBorderBold: false,
      bottomBorderBold: false,
      value: ""
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

  handleTileClick(event) {
    this.props.tileSelector(this.props.id);
    event.preventDefault();
  }

  render() {
    return(
      <div className={`tile ${this.state.rightBorderBold ? "rightBorder" : ""} ${this.state.bottomBorderBold ? "bottomBorder" : ""}`} 
        onClick={this.handleTileClick.bind(this)}></div>
    );
  };
}

export default SudokuTile;
