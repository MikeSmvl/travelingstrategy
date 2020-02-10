const User = require('../classes/user')
const graphql = require('graphql');
const database = require("../database/database");
const logger = require("../logger/logger.js")
const db = new database().db;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

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
  resolve: function (source, args) {
      return new Promise((resolve, reject) => {
        var hash = bcrypt.hashSync(args.password, 10)
        db.run(`INSERT INTO user(email,password) VALUES(?,?);`,[args.email, hash], function(err) {
            if(err){
                logger.error(err);
                reject(err);
            }
        });
        db.get("SELECT * FROM user ORDER BY user_id DESC LIMIT 1;", (err, row) => {
          console.log(row)
          if(err){
            logger.error(err);
            reject(err);
          }
          resolve({
            email: row["email"],
            password: row["password"]
          });
        });
      });
  }
}

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
          logger.info(__filename +"Trying to query 'SELECT * FROM user WHERE email="+args.destination+";")
          db.get(`SELECT * FROM user WHERE email='${args.email}';`, function(err, rows) {
            if(err){
                  logger.error(err)
                  reject(err);
              }
            logger.info(__filename +"'SELECT * FROM "+args.email+";' successfully queried")
            const bool = bcrypt.compareSync(args.password, rows["password"])
            if(bool) {
              // Issue token
              var email = args.email
              const payload = { email };
              const token = jwt.sign(payload, secret, {
                expiresIn: '1h'
              });
              context.res.cookie('token', token, { httpOnly: true });
            }
            resolve({
              password: "Successful"
            })
          });
      });
  }
}

module.exports = { addUser, getUser }