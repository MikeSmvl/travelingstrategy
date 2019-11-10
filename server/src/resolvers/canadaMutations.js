const Canada = require('../classes/canada')
const inputCanada = require('../classes/inputCanada')
const database = require("../database/database");
const db = new database().db;

var addCanadaToCountry = {
    type: Canada,
    args: {
        input: { 
            type: inputCanada 
        }
    },
    resolve: function (source, args) {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO canada(country_iso,name,advisory_text, visa_info) VALUES(?,?,?,?);",[args.input.country_iso, args.input.name, args.input.advisory_text, args.input.visa_info ], function(err, rows) {
                if(err){
                    reject(err);
                }
                resolve(rows);
            });
        });
    }
}

var deleteCanadaToCountry = {
    type: Canada,
    args: {
        input: { 
            type: inputCanada 
        }
    },
    resolve: function (source, args) {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM canada where country_iso=(?) and name=(?) and advisory_text=(?) and visa_info=(?) ",[args.input.country_iso, args.input.name, args.input.advisory_text, args.input.visa_info ], function(err, rows) {
                if(err){
                    reject(err);
                }
                resolve(rows);
            });
        });
    }
}

module.exports = {addCanadaToCountry, deleteCanadaToCountry}