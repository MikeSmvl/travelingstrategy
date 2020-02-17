const express = require('express');
const ExpressGraphQL = require("express-graphql");
const graphql = require("graphql");
const cookieParser = require('cookie-parser');
const withAuth = require('./middleware');
const Redis = require('ioredis');
const path = require('path')
const { verifyUser } = require('./resolvers/user')

const app = express();
app.use('/confirm' , express.static(path.join(__dirname, 'endpoints')));

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

const redis = new Redis();

app.use("/graphql", (req, res) => {
    return ExpressGraphQL({
        schema: schema,
        graphiql: true,
        context: { req, res, redis },
    })(req, res);
});

app.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
});

app.get('/confirm/:id', async function(req, res) {
    const { id } = req.params;
    const userEmail = await redis.get(id);
    if (userEmail != null) {
        await verifyUser(userEmail);
        await redis.del(id);
        res.sendFile('endpoints/success.html', {root: __dirname });
    } else {
        res.sendFile('endpoints/expired.html', {root: __dirname });
    }
});

app.listen(4000, () => {
    console.log("🚀 GraphQL server running at http://localhost:4000.");
});