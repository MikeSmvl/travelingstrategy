const graphql = require("graphql");

const Country_socket = new graphql.GraphQLObjectType({
  name: "Country_socket",
  fields: {
      country_iso: { type: graphql.GraphQLString },
      country_name: { type: graphql.GraphQLString },
      plug_type: { type: graphql.GraphQLString },
      electric_potential: { type: graphql.GraphQLString },
      frequency: { type: graphql.GraphQLString }
    }
});

module.exports = Country_socket