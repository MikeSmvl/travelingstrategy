const graphql = require("graphql");

const CovidCountry = new graphql.GraphQLObjectType({
  name: "CovidCountry",
  fields: {
      country: { type: graphql.GraphQLString },
      totalcases: { type: graphql.GraphQLInt },
      newcases: { type: graphql.GraphQLInt },
      totaldeaths: { type: graphql.GraphQLInt },
      newdeaths: { type: graphql.GraphQLInt },
      activecases: { type: graphql.GraphQLInt },
      seriouscritical: { type: graphql.GraphQLInt },
      totalrecovered: { type: graphql.GraphQLInt }
    }
});

module.exports = CovidCountry