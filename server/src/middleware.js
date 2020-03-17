const jwt = require('jsonwebtoken');
const { secretEnv } = require('./config')
const secret = secretEnv;

const withAuth = function(req, res, next) {
  try {
    const token = req.headers.cookie.split("token=")[1];
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  } catch(err) {
    res.status(401).send('Unauthorized: No token provided');
  }
}

module.exports = withAuth;