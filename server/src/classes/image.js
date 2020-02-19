const graphql = require("graphql");

const Image = new graphql.GraphQLObjectType({
  name: "Image",
  fields: {
      image_id: { type: graphql.GraphQLString },
      image_link: { type: graphql.GraphQLString },
      geolocation: { type: graphql.GraphQLString },
      cation: { type: graphql.GraphQLString },
      tag: { type: graphql.GraphQLString }
    }
});

module.exports = Image