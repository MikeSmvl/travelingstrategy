const graphql = require("graphql");

const Canada = new graphql.GraphQLObjectType({
  name: "Canada",
  fields: {
      country_iso: { type: graphql.GraphQLString },
      name: { type: graphql.GraphQLString },
      advisory_text: { type: graphql.GraphQLString },
      visa_info: { type: graphql.GraphQLString }
    }
});

module.exports = Canada