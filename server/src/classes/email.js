const graphql = require("graphql");

const Email = new graphql.GraphQLObjectType({
  name: "Email",
  fields: {
      email: { type: graphql.GraphQLString },
      first_name: { type: graphql.GraphQLString },
      last_name: { type: graphql.GraphQLString }
    }
});

module.exports = Email