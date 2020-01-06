# pip install sparqlwrapper before running this script

from SPARQLWrapper import SPARQLWrapper, JSON
from helper_class.api_helper import ApiHelper
from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.database import Database
from lib.config import sqlite_db

endpoint_url = "https://query.wikidata.org/sparql"

query = """# Embassies
SELECT DISTINCT #(SAMPLE(?label) as ?label)
	(SAMPLE(?country_label) as ?country)	(SAMPLE(?city_label) as ?city)	(SAMPLE(?address) as ?address)	(SAMPLE(?coordinates) as ?coordinates)
	(SAMPLE(?operator_label) as ?operator)	(SAMPLE(?type_label) as ?type)	(SAMPLE(?phone) as ?phone)		(SAMPLE(?email) as ?email)
	(SAMPLE(?website) as ?website)			(SAMPLE(?image) as ?image)		?wikidata
	#(SAMPLE(?facebook) as ?facebook) (SAMPLE(?twitter) as ?twitter) (SAMPLE(?youtube) as ?youtube) (SAMPLE(?inception) as ?inception)
WHERE {
	#OPTIONAL {?wikidata rdfs:label ?label.}
	{ ?wikidata p:P31/ps:P31/wdt:P279* wd:Q3917681. } UNION { ?wikidata p:P31/ps:P31/wdt:P279* wd:Q5244910. } # Embassy or de facto embassy
	?wikidata p:P31/ps:P31 ?typeId. ?typeId wdt:P279* wd:Q43229. ?typeId rdfs:label ?type_label. FILTER (lang(?type_label) = "en").
	?wikidata wdt:P131* ?area .
	?area wdt:P17 ?countryId. ?countryId rdfs:label ?country_label. FILTER (lang(?country_label) = "en").
	{?wikidata wdt:P137 ?operatorId.} UNION
	{?wikidata p:P31/ps:P31 ?nunciature. ?nunciature wdt:P137 ?operatorId.} ?operatorId rdfs:label ?operator_label. FILTER (lang(?operator_label) = "en").
	OPTIONAL {?wikidata wdt:P131 ?cityId. ?cityId rdfs:label ?city_label. FILTER (lang(?city_label) = "en").}
	OPTIONAL {?wikidata wdt:P969 ?address.}		OPTIONAL {?wikidata wdt:P625 ?coordinates.}
	OPTIONAL {?wikidata wdt:P1329 ?phone.}		OPTIONAL {?wikidata wdt:P968 ?email.}
	OPTIONAL {?wikidata wdt:P856 ?website.}		OPTIONAL {?wikidata wdt:P18 ?image.}
	#OPTIONAL {?wikidata wdt:P2013 ?facebook.} OPTIONAL {?wikidata wdt:P2002 ?twitter.}
	#OPTIONAL {?wikidata wdt:P2397 ?youtube.} OPTIONAL {?wikidata wdt:P571 ?inception.}
	MINUS {?wikidata wdt:P582 ?endtime.}	 MINUS {?wikidata wdt:P582 ?dissolvedOrAbolished.}
	MINUS {?wikidata p:P31 ?instanceStatement. ?instanceStatement pq:P582 ?endtimeQualifier.}
	# Only countries that still contain the location (ex: Pristina is not in the "Province of Kosovo" because it does not exist anymore.
	FILTER NOT EXISTS {
		?wikidata p:P131/(ps:P131/p:P131)* ?statement.
		?statement ps:P131 ?area.
		?wikidata p:P131/(ps:P131/p:P131)* ?intermediateStatement.
		?intermediateStatement (ps:P131/p:P131)* ?statement.
		?intermediateStatement pq:P582 ?endTime.
	}
} GROUP BY ?wikidata ORDER BY ASC(?country) ASC(?city) ASC(?operator) DESC(?type)"""


def get_results(endpoint_url, query):
    sparql = SPARQLWrapper(endpoint_url)
    sparql.setQuery(query)
    sparql.setReturnFormat(JSON)
    return sparql.query().convert()


results = get_results(endpoint_url, query)

# Initialize database
DB = Database(sqlite_db)

# Create table if it does not exists
DB.add_table('embassies', country='text', city='text',
             operator='text', type='text', phone='text', email='text', website='text')

for result in results["results"]["bindings"]:
    print(result['country']['value'], result['operator']['value'], result['type']['value'])
    DB.insert_or_update(
                'embassies', result['country']['value'], result['city']['value'], result['operator']['value'], result['type']['value'], result['phone']['value'], result['email']['value'], result['website']['value'])