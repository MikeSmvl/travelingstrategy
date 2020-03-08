const graphql = require("graphql");

const Phrase = new graphql.GraphQLObjectType({
    name: "Phrase",
    fields: {
        language: {type: graphql.GraphQLString},
        phrase: {type: graphql.GraphQLString},
        language_iso: {type: graphql.GraphQLString},
        translated_phrase: {type: graphql.GraphQLString},
        pronunciation: {type: graphql.GraphQLString}
      }
  });

module.exports = Phrase