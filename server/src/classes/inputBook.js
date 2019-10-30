const graphql = require("graphql");

inputCanada = new graphql.GraphQLInputObjectType({
    name: 'CanadaInput',
    fields: {
        country_iso: { type: graphql.GraphQLString },
        name: { type: graphql.GraphQLString },
        advisory_text: { type: graphql.GraphQLString },
        visa_info: { type: graphql.GraphQLString }
    }
});

module.exports = inputCanada;