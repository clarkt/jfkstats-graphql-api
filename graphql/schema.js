const graphql = require('graphql');
const PlayerType = require('./PlayerType')
// const Player = require('./../models/Player');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} = graphql;

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    player: {
      type: PlayerType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // return Player.findById(args.id)
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: rootQuery
});