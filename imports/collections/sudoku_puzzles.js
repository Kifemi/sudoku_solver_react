import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'puzzles.insert': function(puzzle) {
    return Puzzles.insert({
      createdAt: new Date(),
      layout: puzzle,
    });
  },

  'puzzles.remove': function(puzzle) {
    return Puzzles.remove(puzzle);
  },

  'puzzles.update': function(puzzle) {
    return Puzzles.update();
  },
});

export const Puzzles = new Mongo.Collection('puzzles');