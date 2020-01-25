class UrlHelper:
    """
    Class used to convert base API links to useable ones that can be parsed
    """

    def __init__(self, api):
        self.api = api

    def get_currency_api(self, country_iso):
        """
        Gets the currency API link for a given country

        :param country_iso:  Name of the country to return the link for.
        """
        try:
            suffix = '/'
            if self.api.endswith(suffix):
                currency_api = f'{self.api}{country_iso}'
                return currency_api
            else:
                currency_api = f'{self.api}/{country_iso}'
                return currency_api
        except Exception as error_msg:
            print(f'Getting currency api link failed with error: {error_msg}')

    def get_united_nations_api(self, country_iso):
        """
        Gets the United Nations API link for a given country

        :param country_iso:  Name of the country to return the link for.
        """
        try:
            api_ending = f'en/iso/{country_iso}.html'
            return f'{self.api}{api_ending}'
        except Exception as error_msg:
            print(f'Getting currency api link failed with error: {error_msg}')

