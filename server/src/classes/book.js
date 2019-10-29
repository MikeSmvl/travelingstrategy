const graphql = require("graphql");

const Book = new graphql.GraphQLObjectType({
  name: "Book",
  fields: {
      author: { type: graphql.GraphQLString },
      title: { type: graphql.GraphQLString },
  }
});

module.exports = Book