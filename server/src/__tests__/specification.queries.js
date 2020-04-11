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

//test for plugs

it("Querying socket table for Canada", () =>{
    const query = `
    {
      country_socket(country_iso:"CA"){
        country_iso,
        country_name,
        plug_type,
        electric_potential,
        frequency
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
  
  
  it("Querying for sockets of all countries", () =>{
    const query = `
    {
      sockets_table{
        country_iso,
        country_name,
        plug_type,
        electric_potential,
        frequency
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
  
  //test for timezones
  
  it("Querying timezone table", () =>{
    const query = `
    {
      timezones_table{
        city,
        country_name,
        country_iso,
        timezone,
        lat,
        lng,
        utc_offset
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
  
  it("Querying time difference origin", () =>{
    const query = `
    {
      time_difference_origin(lat_origin:32.4464635, lng_origin:62.1454133, country_origin:"AF"){
        city,
        country_name,
        country_iso,
        timezone,
        lat,
        lng,
        utc_offset
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
  
  it("Querying time difference destination", () =>{
    const query = `
    {
      time_difference_destination(lat_destination:22.6786807, lng_destination:-12.7106394, country_destination:"MR"){
        city,
        country_name,
        country_iso,
        timezone,
        lat,
        lng,
        utc_offset
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
  
  //test for traffic
  
  it("Querying traffic side in Canada", () =>{
    const query = `
    {
      trafficSide(iso: "CA"){
        country_iso,
        country_name,
        traffic_side
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
  
  it("Querying traffic table", () =>{
    const query = `
    {
      trafficTable{
        country_iso,
        country_name,
        traffic_side
      }
  }`
  ;
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