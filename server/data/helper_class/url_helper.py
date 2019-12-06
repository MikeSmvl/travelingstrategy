class url:
	def __init__(self, api):
		self.api = api

	def get_currency_api(self, country_iso):
		try:
			suffix = '/'
			if self.api.endswith(suffix):
				currency_api = f'{self.api}{country_iso}'
				return currency_api
			else:
				currency_api = f'{self.api}/{country_iso}'
				return currency_api
		except Exception as e:
			print(f'Getting currency api link failed with error: {e}')