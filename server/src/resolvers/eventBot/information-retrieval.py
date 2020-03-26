
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

if __name__ == "__main__":
    print("eventInfo",eventInfo)
    print("==============")
    wikipediaLinks = getWikipediaLinks(eventInfo)
    dbpediaLinks = []
    for link in wikipediaLinks:
        dbpediaLinks = getDBpediaLink(dbpediaLinks,link)

    print(dbpediaLinks)
