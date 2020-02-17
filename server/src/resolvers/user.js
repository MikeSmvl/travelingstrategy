const User = require('../classes/user');
const graphql = require('graphql');
const database = require('../database/database');
const logger = require('../logger/logger.js');
const db = new database().db;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('./emailVerification/emailVerification');
const { v4 } = require('uuid')

const secret = 'mysecretsshhh';

var addUser = {
  type: User,
  args: {
    email: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString)
    },
    password: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString)
    }
  },
  resolve: function(source, args, context) {
    return new Promise((resolve, reject) => {
      var hash = bcrypt.hashSync(args.password, 10);
      db.run(
        `INSERT INTO user(email,password) VALUES(?,?);`,
        [args.email, hash],
        function(err) {
          if (err) {
            logger.error(err);
            reject(err);
          } else {
            db.get(
              'SELECT * FROM user ORDER BY user_id DESC LIMIT 1;',
              (err, row) => {
                if (err) {
                  logger.error(err);
                  reject(err);
                }
                resolve({
                  email: row['email'],
                  password: row['password'],
                  verified: row['verified']
                });
                const id = v4();
                context.redis.set(id, row['email'], "ex", 60*60*24);
                sendEmail(row['email'], `http://localhost:4000/confirm/${id}`);
              }
            );
          }
        }
      );
    });
  }
};

var getUser = {
  type: User,
  args: {
    email: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString)
    },
    password: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString)
    }
  },
  resolve: (root, args, context, info) => {
    return new Promise((resolve, reject) => {
      logger.info(
        __filename +
          "Trying to query 'SELECT * FROM user WHERE email=" +
          args.destination +
          ';'
      );
      db.get(`SELECT * FROM user WHERE email='${args.email}';`, function(
        err,
        rows
      ) {
        if (err) {
          logger.error(err);
          reject(err);
        }
        if (rows == undefined) {
          resolve({
            email: 'Email is not registered.',
            password: false,
            verified: 0
          });
        } else {
          logger.info(
            __filename +
              "'SELECT * FROM " +
              args.email +
              ";' successfully queried"
          );
          const bool = bcrypt.compareSync(args.password, rows['password']);
          const verified = rows['verified'];
          if (bool && verified) {
            // Issue token
            var email = args.email;
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: '1h'
            });
            context.res.cookie('token', token, { httpOnly: true });
            resolve({
              email: true,
              password: bool,
              verified: verified
            });
          } else {
            resolve({
              email: true,
              password: bool,
              verified: verified
            });
          }
        }
      });
    });
  }
};

async function verifyUser(user) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE user SET verified="1" WHERE email="${user}";`,
      function(err) {
        if (err) {
          logger.error(err);
          reject(err);
        } else {
          // console.log(`Successfully verified ${user} account`);
          resolve();
        }
      }
    );
  });
}

module.exports = { addUser, getUser, verifyUser };
