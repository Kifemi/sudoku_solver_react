import React, { Component } from 'react';
//import { withTracker } from 'meteor/react-meteor-data';

//import { Puzzles } from '../../imports/collections/sudoku_puzzles';

class SudokuList extends Component {
  // constructor(props) {
  //   super(props);
  // };

  handleClick = (id) => {
    this.props.puzzleClick(id);
  } 

  renderPuzzleList = () => {
    return this.props.puzzleList.map(puzzle => ( 
      <a key={puzzle._id} className="list-group-item list-group-item-action" onClick={() => this.handleClick(puzzle._id)}>
        {puzzle._id}
        <span className='float-right'>
          <button className='btn btn-danger' onClick={() => this.props.removePuzzle(puzzle)}>
            Remove
          </button>
        </span>
      </a>
    ));   
  }

  render() {
    return (
      <div>
        <div className='header'>
          <h1>Puzzle list</h1>
        </div>
        <div className='list-group'>
          {this.renderPuzzleList()}
        </div>
      </div>
    );
  };
};

export default SudokuList;

// export default withTracker(() => {
//   Meteor.subscribe('puzzles');

//   return { puzzles: Puzzles.find({}).fetch() };
// })(SudokuList);