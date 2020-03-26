
import sys
# import requests

import textrazor

textrazor.api_key = "a13914c08e80484e93ccfa9017c8e479ad15bb500039021f34b5bdcb"

client = textrazor.TextRazor(extractors=["entities"])
response = client.analyze("Real Madrid")

print(response.json)

for entity in response.entities():
    print (entity.wikipedia_link)

# eventInfo = "Real Madrid"
# # eventInfo = sys.argv[1]
# # api-endpoint
# prefix = "http://api.dbpedia-spotlight.org/en/lookup?text="
# URL = prefix+eventInfo

# headers = {'accept': 'application/json'}
# print(URL)
# response = requests.get(url = URL, headers = headers)

# print("response code: ",response.status_code)
# print(response.json())


# print("python",eventInfo)
