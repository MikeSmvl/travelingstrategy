const express = require('express');
const ExpressGraphQL = require("express-graphql");
const graphql = require("graphql");
const cookieParser = require('cookie-parser');
const withAuth = require('./middleware');

const app = express();

const queries = require('./resolvers/queries');
const mutations = require('./resolvers/mutations');

const schema = new graphql.GraphQLSchema({
    query: queries,
    mutation: mutations
});

const cors = require("cors");
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
})) // Use this after the variable declaration
app.use(cookieParser());
app.use("/graphql", (req, res) => {
    return ExpressGraphQL({
        schema: schema,
        graphiql: true,
        context: { req, res },
    })(req, res);
});

app.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
});

app.listen(4000, () => {
    console.log("🚀 GraphQL server running at http://localhost:4000.");
});