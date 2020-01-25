const graphql = require("graphql");

const UnitedNations = new graphql.GraphQLObjectType({
  name: "UnitedNations",
  fields: {
      country: { type: graphql.GraphQLString },
      lifeExpectancy: { type: graphql.GraphQLString },
      infantMortality: { type: graphql.GraphQLString },
      nbOfPhysicians: { type: graphql.GraphQLString },
      homicideRate: { type: graphql.GraphQLString },
      sanitation: { type: graphql.GraphQLString },
      water: { type: graphql.GraphQLString }
    }
});

module.exports = UnitedNations