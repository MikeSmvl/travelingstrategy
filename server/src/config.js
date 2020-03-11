require('dotenv').config()

module.exports = {
    secretEnv: process.env.SECRET,
    backendEnv: process.env.BACKEND,
    originEnv: process.env.ORIGIN,
    graphiqlEnv: true
};