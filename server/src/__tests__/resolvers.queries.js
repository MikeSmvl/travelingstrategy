const EasyGraphQLTester = require("easygraphql-tester");
const graphql = require("graphql");
const queries = require('../resolvers/queries')
const logger = require('../logger/logger.js')



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
        logger.error(__filename +result.errors[0].message)
      }
      else{
        logger.info(__filename +"There is no error in the query parameters")
      }
    })
    .catch(err => logger.error(__filename +" "+err))
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
      if(result.error != undefined){
        logger.error(__filename +result.errors[0].message)
      }
      else{
        logger.info(__filename +"There is no error in the query parameters")
      }
    })
    .catch(err => logger.error(__filename +" "+err))
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
          logger.error(__filename +result.errors[0].message)
        }
        else{
          logger.info(__filename +"There is no error in the query parameters")
        }
      })
      .catch(err => logger.error(__filename +" "+err))
});
