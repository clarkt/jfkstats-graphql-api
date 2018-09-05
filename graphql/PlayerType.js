const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const PlayerType = new GraphQLObjectType({
  name: 'Player',
  fields: () => ({
    id: { GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    positions: { type: GraphQLString }
  })
});

module.exports = PlayerType;