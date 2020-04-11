import sys
from unittest.mock import MagicMock, Mock
import unittest
import textrazor
from SPARQLWrapper import SPARQLWrapper, JSON

textrazor.api_key = "a13914c08e80484e93ccfa9017c8e479ad15bb500039021f34b5bdcb"
sparql = SPARQLWrapper("http://dbpedia.org/sparql")

sys.path.append('../../src/resolvers/eventBot/')
from botLibrary import getWikipediaLinks,getDBpediaLink,getDBpediaLinkSpotlight,getImage,getLabel,getComment,getWikiLinks

class parseTest(unittest.TestCase):
    def test_getWikiLinks(self):
        eventInfo = "Madrid Paris"
        wikipediaLinks = getWikipediaLinks(eventInfo)
        self.assertEqual(2, len(wikipediaLinks))

    def test_getDBPLinks(self):
        listOfLinks = []
        wikiLink = "http://en.wikipedia.org/wiki/Paris"
        listOfLinks = getDBpediaLink(listOfLinks,wikiLink)
        self.assertEqual(1, len(listOfLinks))

    def test_Spotlight_Annotator(self):
        eventInfo = "Madrid Paris"
        wikipediaLinks = getWikipediaLinks(eventInfo)
        self.assertEqual(2, len(wikipediaLinks))

    def test_get_Image(self):
        dbpediaLink = "http://dbpedia.org/resource/Paris"
        imageLink = getImage(dbpediaLink)
        self.assertNotEqual("", imageLink)

    def test_get_Label(self):
        dbpediaLink = "http://dbpedia.org/resource/Paris"
        label = getLabel(dbpediaLink)
        self.assertEqual("Paris", label)

    def test_get_Comment(self):
        dbpediaLink = "http://dbpedia.org/resource/Paris"
        comment = getComment(dbpediaLink)
        self.assertNotEqual("", comment)

    def test_get_Wiki(self):
        dbpediaLink = "http://dbpedia.org/resource/Paris"
        wiki = getWikiLinks(dbpediaLink)
        self.assertEqual("http://en.wikipedia.org/wiki/Paris", wiki)

if __name__ == '__main__':
    unittest.main()