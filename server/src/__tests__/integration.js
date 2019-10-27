const database = require("../database/database");
const db = new database();

test("Test db connection", () =>{
    console.log = jest.fn();
    expect(db).not.toEqual({});
});

