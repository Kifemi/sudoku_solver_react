import { Mongo } from 'meteor/mongo';

// Meteor.methods({
//   'puzzles.insert': function() {
//     return Puzzles.insert({
//       createdAt: new Date(),
//       puzzle: '',
//       puzzleId: 0,
//     });
//   },

//   'puzzles.remove': function(puzzle) {
//     return Puzzles.remove(puzzle);
//   },

//   'puzzles.update': function(puzzle) {
//     return Puzzles.update();
//   },
// });

export const Puzzles = new Mongo.Collection('puzzles');