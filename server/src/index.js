const express = require('express');

const ExpressGraphQL = require("express-graphql");
const graphql = require("graphql");

const app = express();

const queries = require('./resolvers/queries')

const schema = new graphql.GraphQLSchema({
    query: queries
    // mutation: mutations
});

app.use("/", ExpressGraphQL({ schema: schema, graphiql: true}));

app.listen(4000, () => {
    console.log("🚀 GraphQL server running at http://localhost:4000.");
});