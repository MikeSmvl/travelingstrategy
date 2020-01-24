const graphql = require("graphql");

const Emergency = new graphql.GraphQLObjectType({
  name: "Emergency",
  fields: {
      country: { type: graphql.GraphQLString },
      police: { type: graphql.GraphQLString },
      ambulance: { type: graphql.GraphQLString },
      fire: { type: graphql.GraphQLString }
    }
});

module.exports = Emergency