const graphql = require("graphql");

const Drug = new graphql.GraphQLObjectType({
  name: "Drug",
  fields: {
      country_iso: { type: graphql.GraphQLString },
      country_name: { type: graphql.GraphQLString },
      methaphetamine_possession: { type: graphql.GraphQLString },
      methaphetamine_sale: { type: graphql.GraphQLString },
      methaphetamine_transport: { type: graphql.GraphQLString },
      methaphetamine_cultivation: { type: graphql.GraphQLString },
      cocaine_possession : { type: graphql.GraphQLString },
      cocaine_sale : { type: graphql.GraphQLString },
      cocaine_transport: { type: graphql.GraphQLString },
      cocaine_cultivation : { type: graphql.GraphQLString },
      canabais_recreational : { type: graphql.GraphQLString },
      canabais_medical : { type: graphql.GraphQLString }
    }
});

module.exports = Drug