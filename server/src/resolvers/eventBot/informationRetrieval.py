
import sys,json

from botLibrary import getWikipediaLinks,getDBpediaLink,getDBpediaLinkSpotlight,getImage,getLabel,getComment,getWikiLinks

# eventInfo = sys.argv[1]
eventInfo = "eventInfo conferences A return of this perennial favorite, featuring renowned arbitrators discussing the hottest topics in commercial dispute resolution.  A Co-Presentation with the American Arbitration AssociationDate: April 16, 2020Time: 5:30 p.m. – 6:50 p.m.(wine and cheese reception to follow)Location: Events CenterRegistration Required, Free Admission 1.5 credit in Professional Practice (NY transitional and nontransitional)NYLS CLE Financial Aid Policy Cutting-Edge Topics in Commercial Arbitration 185 West Broadway New York, NY 10013 United States of America New York Law School"



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