const graphql = require("graphql");

const Vaccines = new graphql.GraphQLObjectType({
  name: "Vaccines",
  fields: {
      country_iso: { type: graphql.GraphQLString },
      vaccine_name: { type: graphql.GraphQLString },
      vaccine_info: { type: graphql.GraphQLString },
    }
});

module.exports = Vaccines