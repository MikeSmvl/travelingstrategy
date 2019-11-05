const Canada = require('../classes/canada')
const inputCanada = require('../classes/inputCanada')
const database = require("../database/database");
const logger = require("../logger/logger.js")
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
            logger.info("Trying to query 'INSERT INTO canada(country_iso,name,advisory_text, visa_info) VALUES("+args.input.country_iso+","+args.input.name+","+args.input.advisory_text+","+args.input.visa_info+");'")
            db.run("INSERT INTO canada(country_iso,name,advisory_text, visa_info) VALUES(?,?,?,?);",[args.input.country_iso, args.input.name, args.input.advisory_text, args.input.visa_info ], function(err, rows) {
                if(err){
                    logger.error(err);
                    reject(err);
                }
                logger.info("'INSERT INTO canada(country_iso,name,advisory_text, visa_info) VALUES("+args.input.country_iso+","+args.input.name+","+args.input.advisory_text+","+args.input.visa_info+");' successfully queried")
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
            logger.info("Trying to query 'DELETE FROM canada where country_iso=("+args.input.country_iso+") and name=("+args.input.name+") and advisory_text=("+args.input.advisory_text+") and visa_info=("+args.input.visa_info+") '")
            db.run("DELETE FROM canada where country_iso=(?) and name=(?) and advisory_text=(?) and visa_info=(?) ",[args.input.country_iso, args.input.name, args.input.advisory_text, args.input.visa_info ], function(err, rows) {
                if(err){
                    logger.error(err);
                    reject(err);
                }
                logger.info("Trying to query 'DELETE FROM canada where country_iso=("+args.input.country_iso+") and name=("+args.input.name+") and advisory_text=("+args.input.advisory_text+") and visa_info=("+args.input.visa_info+") '")
                resolve(rows);
            });
        });
    }
}

module.exports = {addCanadaToCountry, deleteCanadaToCountry}