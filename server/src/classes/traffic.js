const graphql = require("graphql");

const Traffic = new graphql.GraphQLObjectType({
  name: "Traffic",
  fields: {
      country_iso: { type: graphql.GraphQLString },
      country_name: { type: graphql.GraphQLString },
      traffic_side: { type: graphql.GraphQLString }
    }
});

module.exports = Traffic