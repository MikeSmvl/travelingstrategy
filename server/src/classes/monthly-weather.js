const graphql = require("graphql");

const WeatherByMonth = new graphql.GraphQLObjectType({
  name: "Weather",
  fields: {
      city: { type: graphql.GraphQLString },
      january: { type: graphql.GraphQLString },
      february: { type: graphql.GraphQLString },
      march: { type: graphql.GraphQLString },
      may: { type: graphql.GraphQLString },
      april: { type: graphql.GraphQLString },
      may: { type: graphql.GraphQLString },
      june: { type: graphql.GraphQLString },
      july: { type: graphql.GraphQLString },
      august: { type: graphql.GraphQLString },
      septembre: { type: graphql.GraphQLString },
      octobre: { type: graphql.GraphQLString },
      novembre: { type: graphql.GraphQLString },
      decembre: { type: graphql.GraphQLString },
    }
});

module.exports = WeatherByMonth