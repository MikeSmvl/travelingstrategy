import requests
from helper_class.timeout import timeout

class api:
	def __init__(self, link):
		self.link = link
		self.response = self.get_response(link)

	@timeout(5)
	def get_response(self, link):
		try:
			response = requests.get(link)
			return response
		except Exception as e:
			print(f'Could not initialize api because of the following error: {e}')


	def get_code(self):
		return self.response

	def get_json(self):
		return self.response.json()