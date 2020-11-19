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
  };

  Meteor.publish('puzzles', function() {
    // returns cursor, which is like a bookmark; not the actual data, but path to it
    return Puzzles.find({}, { limit: 5 });
  });

});
