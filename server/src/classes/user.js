const graphql = require("graphql");

const User = new graphql.GraphQLObjectType({
  name: "User",
  fields: {
      email: { type: graphql.GraphQLString },
      password: { type: graphql.GraphQLString },
      verified: { type: graphql.GraphQLInt }
    }
});

module.exports = User