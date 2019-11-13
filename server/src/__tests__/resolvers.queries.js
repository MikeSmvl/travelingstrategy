const EasyGraphQLTester = require("easygraphql-tester");
const graphql = require("graphql");

const fs = require('fs')
const path = require('path')
const queries = require('../resolvers/queries')


const schemaCode = new graphql.GraphQLSchema({
  query: queries
});

const tester = new EasyGraphQLTester(schemaCode)

it("Querying Canada to France", () =>{
  const query = `
  {
    canadaAll(name: "France"){
      country_iso,
      name,
      advisory_text,
      visa_info
    }
  }
`;
tester.test(true, query)
});


it("Querying Germany to France", () =>{
  const query = `
  {
    countryToCountry(origin: "Gernmany", destination: "France"){
      country_iso,
      name,
      advisory_text,
      visa_info
    }
  }
`;
tester.test(true, query)
});

it("Querying Canada Table", () =>{
  const query = `
  {
    countryTable(name:"Canada"){
      country_iso,
      name,
      advisory_text,
      visa_info
    }
  }
`;
tester.test(true, query)
});
