const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const PlayerType = new graphQLObjectType({
    name: 'Player',
    fields: () => ({
        id: { graphQLString },
        firstName: {type:  GraphQLString },
        lastName: { type: GraphQLString },
        positions: { type: GraphQLString }
    })
});

module.exports = PlayerType;