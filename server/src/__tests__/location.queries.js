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


it("Querying events retrieved for a city", () =>{
const query =`
{
  city_average_monthly_weather(city:"montreal"){
    city,
    january,
    february,
    march,
    april,
    may,
    june,
    july,
    august,
    septembre,
    octobre,
    novembre,
    decembre,
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
it("Querying events retrieved for a city", () =>{
const query =`
{
  monthly_weather_table{
    city,
    january,
    february,
    march,
    april,
    may,
    june,
    july,
    august,
    septembre,
    octobre,
    novembre,
    decembre,
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

it("Querying translation by language_iso for french", () =>{
  const query =`
  {
    phrasesTranslation(language_iso:"fr"){
      phrase,
      translated_phrase
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

it("Querying translation by country_iso for CO", () =>{
  const query =`
  {
    phrasesTranslationCountry(country_iso:"CO"){
      phrase,
      translated_phrase
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

it("Querying events retrieved for a city", () =>{
    const query =`
    {
      city_average_monthly_weather(city:"montreal"){
        city,
        january,
        february,
        march,
        april,
        may,
        june,
        july,
        august,
        septembre,
        octobre,
        novembre,
        decembre,
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
    it("Querying events retrieved for a city", () =>{
    const query =`
    {
      monthly_weather_table{
        city,
        january,
        february,
        march,
        april,
        may,
        june,
        july,
        august,
        septembre,
        octobre,
        novembre,
        decembre,
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
    
    it("Querying translation by language_iso for french", () =>{
      const query =`
      {
        phrasesTranslation(language_iso:"fr"){
          phrase,
          translated_phrase
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
    
    it("Querying translation by country_iso for CO", () =>{
      const query =`
      {
        phrasesTranslationCountry(country_iso:"CO"){
          phrase,
          translated_phrase
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
    