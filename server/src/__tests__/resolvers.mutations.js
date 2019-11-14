const EasyGraphQLTester = require("easygraphql-tester");
const graphql = require("graphql");
const { expect } = require("chai");
const mutations = require('../resolvers/mutations')
const queries = require('../resolvers/queries')

const schemaCode = new graphql.GraphQLSchema({
  mutation: mutations
});

const tester = new EasyGraphQLTester(schemaCode)


describe("Inserting Canada to Country", () => {
  it("Mutation", () => {
    let error;
    try{
      const mutation = `
        mutation AddCanadaToCountry($input: CanadaInput!) {
          addCanadaToCountry(input: $input) {
              country_iso,
              name,
              advisory_text,
              visa_info
          }
        }
      `;
      tester.mock(mutation, {
        input: {
          country_iso:"Test",
          name: "Test",
          advisory_text:"Test",
          visa_info: "Test"
        }
      });
    }
    catch (err) {
      error=err;
    }
  });
});

describe("Deleting Canada to Country", () => {
  it("Mutation", () => {
    let error;
    try{
      const mutation = `
        mutation DeleteCanadaToCountry($input: CanadaInput!) {
          DeleteCanadaToCountry(input: $input) {
              country_iso,
              name,
              advisory_text,
              visa_info
          }
        }
      `;
      tester.mock(mutation, {
        input: {
          country_iso:"",
          name: "",
          advisory_text:"",
          visa_info: ""
        }
      });
    }
    catch (err) {
      error=err;
    }
  });
});
