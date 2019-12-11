const graphql = require("graphql");

const City_Timezone = new graphql.GraphQLObjectType({
  name: "City_Timezone",
  fields: {
      city: { type: graphql.GraphQLString },
      country_name: { type: graphql.GraphQLString },
      country_iso: { type: graphql.GraphQLString },
      timezone: { type: graphql.GraphQLString },
      lat: { type: graphql.GraphQLFloat },
      lng: { type: graphql.GraphQLFloat },
      utc_offset: { type: graphql.GraphQLFloat }
    }
});

module.exports = City_Timezone