const graphql = require("graphql");

const Currency = new graphql.GraphQLObjectType({
  name: "Currency",
  fields: {
      country: { type: graphql.GraphQLString },
      name: { type: graphql.GraphQLString },
      code: { type: graphql.GraphQLString },
      symbol: { type: graphql.GraphQLString }
    }
});

module.exports = Currency