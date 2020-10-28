import React, { Component } from 'react';

import '../styles/sudoku_tile.css';

class SudokuTile extends Component { 
  constructor(props) {
    super(props);
    
    this.state = {
      rightBorderBold: false,
      bottomBorderBold: false,
      isSelected: this.props.isSelected,
      value: this.props.value,
      error: this.props.error
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

    if(prevProps.error != this.props.error){
      this.setState({error: this.props.error});
    }
    //console.log(this.state.error);

    if(prevState.value != this.props.value) {
        this.setState({value: this.props.value});
    }
  }

  handleTileClick(event) {   
    this.props.tileSelector(this.props.id);
    event.preventDefault();
  }

  render() {
    return(
      <div className={`tile ${this.state.rightBorderBold ? "rightBorder" : ""} ${this.state.bottomBorderBold ? "bottomBorder" : ""}
        ${this.state.isSelected ? "selected" : ""} ${this.state.error ? "incorrect" : ""} `} onClick={this.handleTileClick.bind(this)}>
      {this.state.value}
      </div>
    );
  };
}

export default SudokuTile;
