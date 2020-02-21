#!/usr/bin/env python

from urllib import request, parse
from bs4 import BeautifulSoup

def youtube_link(search_text: str) -> "link":
  """Function that searches anything on YouTube and returns the first video's link.
    Ex: "Croatia 4k" -> https://www.youtube.com/watch?v=HSsqzzuGTPo

    Args:
            search_text: The text to be searched on YouTube.

    Returns:
            The return value. A URL to the first video found.
    """
  try:
    query = parse.quote(search_text)
    url = "https://www.youtube.com/results?search_query=" + query
    response = request.urlopen(url)
    html = response.read()
    soup = BeautifulSoup(html, 'html.parser')
    link_element = soup.find(attrs={'class':'yt-uix-tile-link'})
    return 'https://www.youtube.com' + link_element['href']
  except TypeError as error_msg:
    youtube_link(search_text)
    pass