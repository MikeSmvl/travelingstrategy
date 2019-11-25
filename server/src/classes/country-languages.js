const graphql = require("graphql");

const Country_Languages = new graphql.GraphQLObjectType({
  name: "Country_Languages",
  fields: {
      country_iso: { type: graphql.GraphQLString },
      country_name: { type: graphql.GraphQLString },
      official_languages: { type: graphql.GraphQLString },
      regional_languages: { type: graphql.GraphQLString },
      minority_languages: { type: graphql.GraphQLString },
      national_languages: { type: graphql.GraphQLString },
      widely_spoken_languages: { type: graphql.GraphQLString }
    }
});

module.exports = Country_Languages