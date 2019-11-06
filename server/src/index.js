const express = require('express');

const ExpressGraphQL = require("express-graphql");
const graphql = require("graphql");

const app = express();

const queries = require('./resolvers/queries')
const mutations = require('./resolvers/mutations')

const schema = new graphql.GraphQLSchema({
    query: queries,
    mutation:mutations
});

app.use("/", ExpressGraphQL({ schema: schema, graphiql: true}));

app.listen(4000, () => {
    console.log("🚀 GraphQL server running at http://localhost:4000.");
    var spawn = require("child_process").spawn;
    var process = spawn('python',["scheduler/script_automator.py"], {stdio: "inherit"});
    console.log("🚀 GraphQL server running at http://localhost:4000.");
});

app.get('/name', callName);

function callName(req, res) {

    // Use child_process.spawn method from
    // child_process module and assign it
    // to variable spawn
     var spawn = require("child_process").spawn;
    var process = spawn('python',["scheduler/script_automator.py"], {stdio: "inherit"});


}