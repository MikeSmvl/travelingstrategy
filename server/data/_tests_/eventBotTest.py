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
     def test_add_events(self):
          event_text = "Real Madrid & Barcelona"
          wikipediaLinks = getWikipediaLinks(event_text)
          print(wikipediaLinks)
        #   self.assertFalse("", email_html.events_content)

if __name__ == '__main__':
    unittest.main()