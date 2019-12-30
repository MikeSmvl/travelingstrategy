const graphql = require("graphql");

const Country = new graphql.GraphQLObjectType({
  name: "Country",
  fields: {
      country_iso: { type: graphql.GraphQLString },
      name: { type: graphql.GraphQLString },
      advisory_text: { type: graphql.GraphQLString },
      advisory_link: { type: graphql.GraphQLString },
      visa_info: { type: graphql.GraphQLString }
    }
});

module.exports = Country