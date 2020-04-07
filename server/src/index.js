const express = require('express');
const ExpressGraphQL = require("express-graphql");
const graphql = require("graphql");
const cookieParser = require('cookie-parser');
const withAuth = require('./middleware');
const Redis = require('ioredis');
const path = require('path')
const { verifyUser } = require('./resolvers/user')
const { originEnv, graphiqlEnv } = require('./config')
const {deleteAllowed, removeEvent} = require('./resolvers/eventsMutations')
const { eventBotInfo } = require('./resolvers/eventBot/eventBot')
const {emailEvents} = require('./resolvers/emailEvents/emailEvents')

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
    origin: originEnv
})) // Use this after the variable declaration
app.use(cookieParser());

const redis = new Redis();

app.use("/graphql", (req, res) => {
    return ExpressGraphQL({
        schema: schema,
        graphiql: graphiqlEnv,
        context: { req, res, redis },
    })(req, res);
});

app.get('/checkToken', withAuth, function(req, res) {
    res.json({email: req.email});
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

app.get('/logout', function(req, res){
    res.clearCookie('token');
    res.send('ok');
 });

app.use(express.json());

app.post('/deleteEvent', withAuth, async function(req, res) {
    const requestId = req.body.requestId;
    const eventTitle = req.body.title;
    const email = req.email;
    const userCanDelete = await deleteAllowed(email,requestId);
    if(userCanDelete.email === email){
        res.status(200).json(removeEvent(requestId,eventTitle))
    }
    else{
        res.status(401)
    }
});

app.post('/intelInfo', withAuth, async function(req, res) {
    const eventInfo = req.body.eventInfo
    res.status(200).json(await eventBotInfo(eventInfo))
});

app.post('/emailEvents', withAuth, async function(req, res) {
    // console.log(req.body)
    const requestId = req.body[0].request_id
    const events = req.body
    const email = req.email;

    // Being allowed to deleted and being allowed to send an email is the same requirement
    const sendingEmailAllowed = await deleteAllowed(email,requestId);

    if(sendingEmailAllowed.email === email){
        // res.status(200).json(removeEvent(requestId,eventTitle))
        res.status(200).json(emailEvents(email, events));
    }
    else{
        res.status(401)
    }
});

app.listen(4000, () => {
    console.log("🚀 GraphQL server running at http://localhost:4000/graphql.");
});