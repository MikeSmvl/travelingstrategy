
import sys
# import requests

import textrazor # We are using text razor until dbpedia is back up
from SPARQLWrapper import SPARQLWrapper, JSON

textrazor.api_key = "a13914c08e80484e93ccfa9017c8e479ad15bb500039021f34b5bdcb"
sparql = SPARQLWrapper("http://dbpedia.org/sparql")
# eventInfo = sys.argv[1]
eventInfo = "eventInfo conferences A return of this perennial favorite, featuring renowned arbitrators discussing the hottest topics in commercial dispute resolution.  A Co-Presentation with the American Arbitration AssociationDate: April 16, 2020Time: 5:30 p.m. – 6:50 p.m.(wine and cheese reception to follow)Location: Events CenterRegistration Required, Free Admission 1.5 credit in Professional Practice (NY transitional and nontransitional)NYLS CLE Financial Aid Policy Cutting-Edge Topics in Commercial Arbitration 185 West Broadway New York, NY 10013 United States of America New York Law School"

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

# This method will be used when spotlight is on
# def getDBpediaLinkSpotlight:
    # # api-endpoint
    # prefix = "http://api.dbpedia-spotlight.org/en/lookup?text="
    # URL = prefix+eventInfo

    # headers = {'accept': 'application/json'}
    # print(URL)
    # response = requests.get(url = URL, headers = headers)

    # print("response code: ",response.status_code)
    # print(response.json())


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

def describe(dbpediaLink):
    sparql.setQuery("""
        SELECT ?property ?hasValue ?isValueOf
            WHERE {{
             {{<{}> ?property ?hasValue }}
             UNION
             {{ ?isValueOf ?property <{}> }}
        }}
    """.format(dbpediaLink,dbpediaLink))
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()

    for result in results["results"]["bindings"]:
        print("==========================================================")
        try:
            print("predicate: ",result["property"]["value"]," object: ",result["hasValue"]["value"])
        except KeyError:
            print("predicate: ",result["property"]["value"]," object: ",result["isValueOf"]["value"])
        # print("predicate: ",result["property"]["value"]," value",)

        print(result)

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
        # print("==========================================================")
        # print("Image: ",result["value"]["value"])
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
        # print("==========================================================")
        # print("Label: ",result["value"]["value"])
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
        # print("==========================================================")
        # print("Comment: ",result["value"]["value"])
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
        # print("==========================================================")
        # print("WikiLinks: ",result["value"]["value"])
        return result["value"]["value"]



if __name__ == "__main__":
    # print("eventInfo",eventInfo)
    # print("==============")
    # wikipediaLinks = getWikipediaLinks(eventInfo)
    # dbpediaLinks = []
    # for link in wikipediaLinks:
    #     dbpediaLinks = getDBpediaLink(dbpediaLinks,link)

    # print(dbpediaLinks)
    dbpediaLinks = ['http://dbpedia.org/resource/Arbitration', 'http://dbpedia.org/resource/United_States', 'http://dbpedia.org/resource/New_York_City', 'http://dbpedia.org/resource/Broadway_theatre', 'http://dbpedia.org/resource/Hot_Topic', 'http://dbpedia.org/resource/New_York_Law_School', 'http://dbpedia.org/resource/Dispute_resolution', 'http://dbpedia.org/resource/Wine']

    print(dbpediaLinks)
    eventsDataList = []
    for link in dbpediaLinks:
        image = getImage(link)
        label = getLabel(link)
        comment = getComment(link)
        wikipediaLink = getWikiLinks(link)
        eventData = {
            "image":image,
            "label":label,
            "comment":comment,
            "wikipediaLink":wikipediaLink
        }
        eventsDataList.append(eventData)

    print(eventsDataList)
    # for link in dbpediaLinks:
    #     getLabel(link)