const graphql = require("graphql");

const Unsafe_Areas = new graphql.GraphQLObjectType({
  name: "Unsafe_Areas",
  fields: {
      country_iso: { type: graphql.GraphQLString },
      name: { type: graphql.GraphQLString },
      unsafe_areas: { type: graphql.GraphQLString }

    }
});

module.exports = Unsafe_Areas