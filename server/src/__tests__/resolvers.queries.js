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

// test for drugs
it("Querying Drug table for Canada", () =>{
  const query = `
  {
    drugs(country_iso:"CA") {
      country_iso,
      name,
      methaphetamine_possession,
      methaphetamine_sale,
      methaphetamine_transport,
      methaphetamine_cultivation,
      cocaine_possession,
      cocaine_sale,
      cocaine_transport,
      cocaine_cultivation,
      canabais_recreational,
      canabais_medical
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

//test for unsafe areas table all data
it("Querying unsafe_areas table", () =>{
  const query =`
  {
    unsafe_areas_table {
      country_iso
      name
      unsafe_areas
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

// all data in the vaccine table

// test for vaccines

it("Querying vaccine table for Canada", () =>{
  const query = `
  {
    country_vaccines(country_iso:"CA"){
      country_iso,
    	vaccine_name,
    	vaccine_info
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

it("Querying vaccine table", () =>{
  const query =`
  {
    vaccines_table{
      country_iso,
    	vaccine_name,
    	vaccine_info
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

it("Querying embassies table", () =>{
  const query =`
  {
    embassy(country: "Indonesia", operator: "Canada"){
      city,
    	operator,
      type,
      phone,
      email,
      website
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

it("Querying emergency table", () =>{
  const query =`
  {
    emergency(country: "CA") {
      police
      ambulance
      fire
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

describe("Test for add-subscriber mutation", () => {
  test("Should be a valid mutation", () => {
      const mutation = `
        mutation addSubscriber($email: String!, $search_term: String!, $date_of_trip: String!) {
          addSubscriber(email: $email, search_term: $search_term, date_of_trip: $date_of_trip) {
              email
              search_term
              date_of_trip
          }
        }
      `;
      tester.test(true, mutation, {
        email: "demo@demo.com",
        search_term: "Paris",
        date_of_trip: "2001-01-01"
      });
    }
  );
});

// describe("Test to validate a user with an existing email cannot be created", () => {
//   test("Should be an invalid mutation", () => {
//       const mutation = `
//         mutation addUser($email: String!, $password: String!) {
//           addUser(email: $email, password: $password) {
//               email
//               departure_date
//           }
//         }
//       `;
//       tester.test(false, mutation, {
//         email: "test@test.com",
//         password: "123"
//       });
//     }
//   );
// });



