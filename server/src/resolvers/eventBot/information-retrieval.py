
import sys,json
import requests

import textrazor # We are using text razor until dbpedia is back up
from SPARQLWrapper import SPARQLWrapper, JSON

textrazor.api_key = "a13914c08e80484e93ccfa9017c8e479ad15bb500039021f34b5bdcb"
sparql = SPARQLWrapper("http://dbpedia.org/sparql")
eventInfo = sys.argv[1]
# eventInfo = "eventInfo conferences A return of this perennial favorite, featuring renowned arbitrators discussing the hottest topics in commercial dispute resolution.  A Co-Presentation with the American Arbitration AssociationDate: April 16, 2020Time: 5:30 p.m. – 6:50 p.m.(wine and cheese reception to follow)Location: Events CenterRegistration Required, Free Admission 1.5 credit in Professional Practice (NY transitional and nontransitional)NYLS CLE Financial Aid Policy Cutting-Edge Topics in Commercial Arbitration 185 West Broadway New York, NY 10013 United States of America New York Law School"

# This method annotates the event info to find wikipedia link
# We're finding wikipedia links because textrazor doesn't have dbpedia links
def getWikipediaLinks(textToAnnotate):
    wikipediaLinks = []
    client = textrazor.TextRazor(extractors=["entities"])
    response = client.analyze(eventInfo)
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
    if(eventInfo.replace(" ","") != ""):
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

def removeQuotes(string):
    if(string != None):
        return string.replace("\"","'").replace('\n', ' ').replace('\r', '')
    return ''



if __name__ == "__main__":
    #We are using dpbedia-spotlight to annotate our events info and get
    #dbpedia entities
    #In case it fails, we use textrazor which returns us wikipedia links
    #from the wikipedia links we can get the dbpedia entities

    dbpediaLinks = []
    try:
        dbpediaLinks = getDBpediaLinkSpotlight(eventInfo)
    except:
        wikipediaLinks = getWikipediaLinks(eventInfo)
        for link in wikipediaLinks:
            dbpediaLinks = getDBpediaLink(dbpediaLinks,link)

    eventsDataList = "[]"
    if(len(dbpediaLinks) > 0):
        eventsDataList = "["
        for link in dbpediaLinks:
            image = removeQuotes(getImage(link))
            label = removeQuotes(getLabel(link))
            comment = removeQuotes(getComment(link))
            wikipediaLink = removeQuotes(getWikiLinks(link))
            eventData = "{{\"label\":\"{}\",\"image\":\"{}\",\"comment\":\"{}\",\"wikipediaLink\":\"{}\"}},".format(label,image,comment,wikipediaLink)
            eventsDataList = eventsDataList+eventData
        eventsDataList = eventsDataList[:len(eventsDataList)-1]+"]"
    print((eventsDataList))