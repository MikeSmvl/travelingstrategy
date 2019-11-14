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
    countryToCountry(origin: "Germany", destination: "France"){
      country_iso,
      name,
      advisory_text,
      visa_info
    }
  }
`;
  tester.test(true, query)
  tester.graphql(query, undefined, undefined, { isLocal: false })
    .then(result => {
      if(result.error != undefined){
        console("There is no error in the query parameters")
      }
      else{
        console.log(result.errors[0].message)
      }
    })
    .catch(err => console.log(err))
});


it("Querying Germany to France", () =>{
  const query = `
  {
    countryToCountry(origin: "Germany", destination: "France"){
      country_iso,
      name,
      advisory_text,
      visa_info
    }
  }
`;
  tester.test(true, query)
  tester.graphql(query, undefined, undefined, { isLocal: false })
    .then(result => {
      if(result.errors != undefined){
        console.log(result.errors[0].message)
      }
    })
    .catch(err => console.log(err))
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
  tester.graphql(query, undefined, undefined, { isLocal: false })
      .then(result => {
        if(result.error != undefined){
          console("There is no error in the query parameters")
        }
        else{
          console.log(result.errors[0].message)
        }
      })
      .catch(err => console.log(err))
});
