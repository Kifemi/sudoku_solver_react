import React, { Component } from 'react';

import '../styles/sudoku_tile.css';

class SudokuTile extends Component { 
  constructor(props) {
    super(props);
    
    this.state = {
      rightBorderBold: false,
      bottomBorderBold: false,
      isSelected: this.props.isSelected,
      value: this.props.value
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

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.isSelected != this.props.isSelected) {
      this.setState({isSelected: this.props.isSelected});
    }

    if(prevState.value != this.props.value) {
      this.setState({value: this.props.value});
    }
    // // Changes the selected tile's value to selected number 
    // if((this.props.id == this.props.selectedTile) && (this.state.value != this.props.selectedNumber) && (this.props.selectedNumber !== "")) {
    //   this.setState({value: this.props.selectedNumber});
    // }
    
  }

  handleTileClick(event) {   
    this.props.tileSelector(this.props.id);
    event.preventDefault();
  }

  render() {
    return(
      <div className={`tile ${this.state.rightBorderBold ? "rightBorder" : ""} ${this.state.bottomBorderBold ? "bottomBorder" : ""}
        ${this.state.isSelected ? "selected" : ""}`} onClick={this.handleTileClick.bind(this)}>
      {this.state.value}
      </div>
    );
  };
}

export default SudokuTile;
