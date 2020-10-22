import React, { Component } from 'react';

import '../styles/sudoku_buttons.css';

class SudokuButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: this.props.buttonNumber,
    }
  }

  handleButtonClick(event) {
    this.props.numberSelector(this.state.number);
    event.preventDefault();
  }

  render() {
    return(
      <button className='number-container' onClick={this.handleButtonClick.bind(this)} >
        {this.state.number}
      </button>
    );
  };
}

export default SudokuButton;