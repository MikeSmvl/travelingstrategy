const graphql = require("graphql");

const CovidStat = new graphql.GraphQLObjectType({
  name: "CovidStat",
  fields: {
      total_cases: { type: graphql.GraphQLInt },
      total_deaths: { type: graphql.GraphQLInt },
      serious_critical: { type: graphql.GraphQLInt },
      total_recovered: { type: graphql.GraphQLInt },
    }
});

module.exports = CovidStat