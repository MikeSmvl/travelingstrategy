const fs = require("fs");
const path = require("path");
const EasyGraphQLTester = require("easygraphql-tester");
const { expect } = require("chai");
const graphql = require("graphql");
const schemaCode = fs.readFileSync(path.join(__dirname, "../graphql/", "schema.graphql"), "utf8");
const books = require("../resolvers/books");


describe("Test schema", () => {
  let tester;
  beforeAll(() => {
    tester = new EasyGraphQLTester(schemaCode,books);
  });
describe("Queries", () => {
    test("Query books by title and author", async () => {
      const query = `
        {
          query { 
            books { 
              title
              author
            } 
          }
        }
      `;
      // args="";
      // const result = await tester.graphql(query, {}, {}, args);
      // expect(result.data.books.author).to.be.eq("J.K. Rowling");
      // First arg: false, there is no field notValidField
      // Second arg: query to test
      tester.test(false, query);
    });

    test("Query books by title", async () => {
      const query = `
        {
          query { 
            books { 
              title
            } 
          }
        }
      `;
      // args="";
      // const result = await tester.graphql(query, {}, {});
      // expect(result.data.books.title).to.be.eq("Harry Potter and the Chamber of Secrets");
      tester.test(false, query);
    });

    test("Query books by author", async () => {
      const query = `
        {
          query { 
            books { 
              author
            } 
          }
        }
      `;
      // args="";
      // const result = await tester.graphql(query, {}, {});
      // expect(result.data.books.author).to.be.eq("J.K. Rowling");
      tester.test(false, query);
    });
  });
});
