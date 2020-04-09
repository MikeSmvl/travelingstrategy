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

it("Querying subscribers table", () =>{
  const query =`
  {
    subscriberTable{
      email,
      request_id,
      search_term,

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

it("Querying user subscription", () =>{
  const query =`
  {
    userSubscriptions(email:"test@test.com"){
      email,
      search_term
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

it("Querying images table", () =>{
  const query =`
  {
    imagesTable{
      image_id,
      image_link,
      geolocation,
      caption,
      tag
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

it("Querying images retrieved for a tag", () =>{
  const query =`
  {
    imagesForTag(tag:"newyork"){
      image_id,
      image_link,
      geolocation,
      caption,
      tag
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
it("Querying events retrieved for a request_id", () =>{
  const query =`
  {
    eventsForRequest(request_id:"5"){
      request_id,
      event_category,
    	description,
    	duration,
    	start_date,
    	end_date,
    	title,
    	labels,
    	address,
    	place_type,
    	name_of_place
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




