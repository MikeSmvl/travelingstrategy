const graphql = require("graphql");

inputCountry = new graphql.GraphQLInputObjectType({
    name: 'CountryInput',
    fields: {
        country_iso: { type: graphql.GraphQLString },
        name: { type: graphql.GraphQLString },
        advisory_text: { type: graphql.GraphQLString },
        visa_info: { type: graphql.GraphQLString }
    }
});

module.exports = inputCountry;