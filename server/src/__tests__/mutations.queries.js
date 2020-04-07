const EasyGraphQLTester = require("easygraphql-tester");
const graphql = require("graphql");
const queries = require('../resolvers/queries')
const logger = require('../logger/logger.js')

const { expect } = require("chai");
const mutations = require('../resolvers/mutations')


const schemaCode = new graphql.GraphQLSchema({
  query: queries,  mutation: mutations
});

const tester = new EasyGraphQLTester(schemaCode);

describe("Test for add-subscriber mutation", () => {
    test("Should be a valid mutation", () => {
        const mutation = `
          mutation addSubscriber($email: String!, $search_term: String!, $date_of_trip: String!, $lat: String!, $lng: String!) {
            addSubscriber(email: $email, search_term: $search_term, date_of_trip: $date_of_trip, lat: $lat, lng: $lng) {
                email
                search_term
                date_of_trip
            }
          }
        `;
        tester.test(true, mutation, {
          email: "demo@demo.com",
          search_term: "Paris",
          date_of_trip: "2001-01-01",
          lat:"5",
          lng:"5"
        });
      }
    );
  });