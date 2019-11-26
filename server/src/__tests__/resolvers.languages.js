const EasyGraphQLTester = require("easygraphql-tester");
const graphql = require("graphql");
const queries = require('../resolvers/queries')
const logger = require('../logger/logger.js')

const schemaCode = new graphql.GraphQLSchema({
  query: queries
});

const tester = new EasyGraphQLTester(schemaCode)

it("Querying Canada language Table", () =>{
  const query = `
  {
    country_languages(country_iso:"CA"){
      country_iso,
      country_name,
      official_languages,
      regional_languages,
      minority_languages,
      national_languages,
      widely_spoken_languages
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


