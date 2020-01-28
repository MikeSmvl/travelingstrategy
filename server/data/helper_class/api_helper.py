import requests
from helper_class.timeout import timeout
from lxml import html

class ApiHelper:
    """
    Class used to parse data from api link
    """
    def __init__(self, link):
        self.link = link
        self.response = self.get_response(link)

    @timeout(5)
    def get_response(self, link):
        """
        Gets a response from an API link

        :param link:  Link to get a response from.
        """
        try:
            response = requests.get(link)
            return response
        except Exception as error_msg:
            print(f'Could not initialize api because of the following error: {error_msg}')
            raise


    def get_code(self):
        """
        Gets the HTML code returned from the API link provided when initalizing class
        """
        return self.response

    def get_json(self):
        """
        Returns data from API link in json format
        """
        return self.response.json()

    def get_html(self):
        """
        Returns html tree from API link
        """
        return html.fromstring(self.response.content)