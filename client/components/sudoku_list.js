import React, { Component } from 'react';
//import { withTracker } from 'meteor/react-meteor-data';

//import { Puzzles } from '../../imports/collections/sudoku_puzzles';

class SudokuList extends Component {
  constructor(props) {
    super(props);
  };

  handleClick(event) {
    event.preventDefault();
  } 

  isSelected() {

  }

  generatePuzzleList = () => {
    return <div>
      <div className='header'>
        <h1>Puzzle list</h1>
      </div>
      <div className='list-group'>
        {this.props.puzzleList.map(puzzle => (
          <a key={puzzle._id} className={`list-group-item list-group-item-action
            ${this.isSelected() ? 'active' : ''} `} onClick={this.handleClick.bind(this)}>
            {puzzle._id}
          </a>
        ))}
      </div>
    </div>
  }

  render() {
    return (
      <div>
        {this.generatePuzzleList()}
      </div>
    );
  };
};

export default SudokuList;

// export default withTracker(() => {
//   Meteor.subscribe('puzzles');

//   return { puzzles: Puzzles.find({}).fetch() };
// })(SudokuList);