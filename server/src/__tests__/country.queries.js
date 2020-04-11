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

it("Querying Canada to France", () =>{
  const query = `
  {
    countryToCountry(origin: "CA", destination: "FR"){
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
    countryToCountry(origin: "DE", destination: "FR"){
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
    countryTable(country_iso:"CA"){
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

//test for languages
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

it("Querying language Table", () =>{
    const query = `
    {
      languages_table{
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

//test for unsafe areas Columbia
it("Querying unsafe_areas Columbia", () =>{
    const query =`
    {
      country_unsafe_areas( country_iso: "CO"){
        country_iso
        name
        unsafe_areas
      }
    }`;
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