const EasyGraphQLTester = require("easygraphql-tester");
const graphql = require("graphql");

const fs = require('fs')
const path = require('path')
const queries = require('../resolvers/queries')


const schemaCode = new graphql.GraphQLSchema({
  query: queries
});

const tester = new EasyGraphQLTester(schemaCode)

test("Test Query", () =>{
  const query = `
  {
    canadaAll{
      country_iso,
      name,
      advisory_text,
      visa_info
    }
  }
`;
tester.test(true, query)
});

