const graphql = require("graphql");

const Image = new graphql.GraphQLObjectType({
  name: "Image",
  fields: {
      image_id: { type: graphql.GraphQLString },
      image_link: { type: graphql.GraphQLString },
      geolocation: { type: graphql.GraphQLString },
      caption: { type: graphql.GraphQLString },
      tag: { type: graphql.GraphQLString },
      request_id: { type: graphql.GraphQLString },
      date_retrieved: { type: graphql.GraphQLString }
    }
});

module.exports = Image