const graphql = require('graphql');
const PlayerType = require('./PlayerType')

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
        // logic
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: rootQuery
});