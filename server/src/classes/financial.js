const graphql = require("graphql");

const Financial = new graphql.GraphQLObjectType({
  name: "Financial",
  fields: {
      country: { type: graphql.GraphQLString },
      gasoline: { type: graphql.GraphQLString },
      rent: { type: graphql.GraphQLString },
      groceries: { type: graphql.GraphQLString }
    }
});

module.exports = Financial