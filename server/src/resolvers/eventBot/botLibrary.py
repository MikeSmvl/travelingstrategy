import requests

import textrazor # We are using text razor until dbpedia is back up
from SPARQLWrapper import SPARQLWrapper, JSON

textrazor.api_key = "a13914c08e80484e93ccfa9017c8e479ad15bb500039021f34b5bdcb"
sparql = SPARQLWrapper("http://dbpedia.org/sparql")

# This method annotates the event info to find wikipedia link
# We're finding wikipedia links because textrazor doesn't have dbpedia links
def getWikipediaLinks(textToAnnotate):
    wikipediaLinks = []
    client = textrazor.TextRazor(extractors=["entities"])
    response = client.analyze(textToAnnotate)
    for entity in response.entities():
        wikipediaLinks.append(entity.wikipedia_link)

    wikipediaLinks = list(dict.fromkeys(wikipediaLinks)) #Removing duplicates
    wikipediaLinks = list(filter(None, wikipediaLinks)) #Removing empty strings

    return wikipediaLinks

def getDBpediaLink(dbpediaLinks,wikiLink):
    sparql.setQuery("""
        SELECT ?dbpediaLink
        WHERE {{
            <{}> foaf:primaryTopic ?dbpediaLink .
        }}
        LIMIT 100
    """.format(wikiLink))
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()

    for result in results["results"]["bindings"]:
        dbpediaLinks.append(result["dbpediaLink"]["value"])

    return dbpediaLinks

# This method will be used when spotlight is on
def getDBpediaLinkSpotlight(text):
    dpbediaLinks = []
    if(text.replace(" ","") != ""):
        # api-endpoint
        prefix = "https://api.dbpedia-spotlight.org/en/annotate?text="
        URL = prefix+text+"&confidence=0.7"
        headers = {'accept': 'application/json'}
        response = requests.get(url = URL, headers = headers).json()

        if 'Resources' in response:
            resources = response.get('Resources')
            for resource in resources:
                dpbediaLinks.append(resource['@URI'])

            dpbediaLinks = list(dict.fromkeys(dpbediaLinks)) #Removing duplicates
    return dpbediaLinks

def getImage(dbpediaLink):
    sparql.setQuery("""
        SELECT ?value
            WHERE {{
             <{}> foaf:depiction ?value
        }}
    """.format(dbpediaLink))
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()

    for result in results["results"]["bindings"]:
        return result["value"]["value"]

def getLabel(dbpediaLink):
    sparql.setQuery("""
        SELECT ?value
            WHERE {{
             <{}> rdfs:label ?value.
             FILTER (LANG(?value) = 'en') . 
        }}

    """.format(dbpediaLink))
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()

    for result in results["results"]["bindings"]:
        return result["value"]["value"]

def getComment(dbpediaLink):
    sparql.setQuery("""
        SELECT ?value
            WHERE {{
             <{}> rdfs:comment ?value.
             FILTER (LANG(?value) = 'en') .
        }}

    """.format(dbpediaLink))
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()

    for result in results["results"]["bindings"]:
        return result["value"]["value"]

def getWikiLinks(dbpediaLink):
    sparql.setQuery("""
        SELECT ?value
            WHERE {{
             <{}> foaf:isPrimaryTopicOf ?value.
        }}

    """.format(dbpediaLink))
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()

    for result in results["results"]["bindings"]:
        return result["value"]["value"]