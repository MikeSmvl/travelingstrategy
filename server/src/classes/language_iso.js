const graphql = require("graphql");

const Language_Iso = new graphql.GraphQLObjectType({
  name: "Language_Iso",
  fields: {
      country_iso: { type: graphql.GraphQLString },
      language_iso: {type: graphql.GraphQLString },
      language:  {type: graphql.GraphQLString }
    }
});

module.exports = Language_Iso