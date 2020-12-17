import { Meteor } from 'meteor/meteor';

import { Puzzles } from '../imports/collections/sudoku_puzzles';

Meteor.startup(() => {
  // Check to see if data exists in the collection
  const numberRecords = Puzzles.find({}).count();


  // Add puzzles here!
  if(!numberRecords) {
    Puzzles.insert({
      puzzleId: 1,
      layout: [null, null, null, 6, null, null, 4, null, null, 
               7, null, null, null, null, 3, 6, null, null,
              null, null, null, null, 9, 1 , null, 8, null,
              null, null, null, null, null, null, null, null, null,
              null, 5, null, 1, 8, null, null, null, 3,
              null, null, null, 3, null, 6, null, 4, 5,
              null, 4, null, 2, null, null, null, 6, null,
              9, null, 3, null, null, null, null, null, null,
              null, 2, null, null, null, null, 1, null, null]
    });
    Puzzles.insert({
      puzzleId: 4,
      layout: [4, null, null, 2, 6, null, 7, null, 1, 
               6, 8, null, null, 7, null, null, 9, null,
              1, 9, null, null, null, 4 , 5, null, null,
              8, 2, null, 1, null, null, null, 4, null,
              null, null, 4, 6, null, 2, 9, null, null,
              null, 5, null, null, null, 3, null, 2, 8,
              null, null, 9, 3, null, null, null, 7, 4,
              null, 4, null, null, 5, null, null, 3, 6,
              7, null, 3, null, 1, 8, null, null, null]
    });
    Puzzles.insert({
      puzzleId: 5,
      layout: [6, null, null, null, null, 9, null, 5, null, 
              null, null, null, null, 5, 6, null, null, 3,
              null, 4, null, 8, null, null, 9, 2, null,
              null, null, null, null, 3, null, 6, null, null,
              null, null, null, null, 9, null, 7, 3, 4,
              null, null, null, null, null, null, 2, null, 9,
              7, 8, null, null, null, null, null, null, null,
              3, 1, 9, 4, null, null, null, null, null,
              4, 5, null, null, null, 3, 1, null, null]
    });
    Puzzles.insert({
      puzzleId: 5,
      layout: [null, null, 6, null, 3, 2, null, 5, null, 
              null, null, null, 7, null, 5, 3, 9, null,
              null, null, null, null, null, null, null, null, 4,
              null, null, null, 6, null, null, null, null, null,
              null, null, null, null, 5, null, null, 3, null,
              null, 3, 1, null, null, 4, 6, null, 2,
              9, null, null, null, 7, 8, 4, 1, 5,
              null, 8, 5, null, null, null, null, null, 3,
              3, 7, null, null, 6, null, null, null, 8]
    });
  };

  Meteor.publish('puzzles', function() {
    // returns cursor, which is like a bookmark; not the actual data, but path to it
    return Puzzles.find({}, { limit: 25 });
  });

});
