import requests
import time
import json
from bs4 import BeautifulSoup
import regex
from helper_class.chrome_driver import create_driver, quit_driver
from helper_class.country_names import find_all_iso
from helper_class.wiki_visa_parser import wiki_visa_parser
from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.database import Database
from lib.config import instagram_url
import datetime
from selfie_detection import get_last_discarded, save_img_url, check_if_selfie, check_if_group_photo
from object_detection import check_for_objects
from dominant_colors import find_nearest_colors
from PIL import Image
import PIL

# so were gonna want to get/do
# 1. the caption C4VMK
# 2. the geolocation, especially if its a restaurant O4GlU
# 3. we need to save, we need to talk about how to make the tablees
# 4. we need to gather images on a time scale (2-7 days for now)

# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()
DB = Database("countries.sqlite")
NOW = datetime.datetime.now()
DATE = NOW.strftime("%Y-%m-%d")

#getting inforamtion for one image
def get_image_info(driver, u):

    driver.get(u)
    soup = BeautifulSoup(driver.page_source, 'lxml')

    geoloc = soup.find('a',{'class':'O4GlU'})
    caption = soup.find('a', {'class':'sqdOP yWX7d _8A5w5 ZIAjV'})
    img = soup.find('img', {'class':'FFVAD'})

    image_info = {}

    if not geoloc == None:
        image_info['geolocation'] = geoloc.text
        image_info['geo_link'] = "https://www.instagram.com"+geoloc['href']
    else:
        image_info['geolocation'] = ""
        image_info['geo_link'] = ""
    if not caption == None:
        image_info['caption'] = caption.text
    else:
        image_info['caption'] = ""
    if not img == None:
        image_info['image_link'] = img.get('src')

    return image_info

#finding a post or multiple for one hashtag
def find_a_post(location, request_id, i=1):

    LOGGER.info(f'Starting the parser for the following location: {location}')
    driver = create_driver()
    location = location.replace(' ','')

    url = instagram_url + location + "/"
    try:
        LOGGER.info(f'Retreiving the link to the image page for: {location}')
        driver.get(url)
        soup = BeautifulSoup(driver.page_source, 'lxml')
        garb_all = soup.find_all('a', {'href':regex.compile(r'/p/')})
    except:
        LOGGER.error(f'Could not get the link to the image page for: {location}')
        exit

    count = 0
    for g in garb_all:
        count += 1
        if count > i:
            break

        u = "https://www.instagram.com"+g.get('href')
        try:
            image_info = get_image_info(driver,u)
            LOGGER.success(f'Image info for: {location}')
        except:
            LOGGER.error(f'Could not get the info of the image for: {location}')
            count -= 1

        try:
            save_img_url(image_info['image_link'], 'images_to_filter/check.jpg')
            selfie = check_if_selfie('images_to_filter/check.jpg')
            group_photo = check_if_group_photo('images_to_filter/check.jpg')
            objects_too_big = check_for_objects('images_to_filter/check.jpg')
            too_much_similar_colors = find_nearest_colors('images_to_filter/check.jpg')
            if not selfie and not group_photo and not objects_too_big and not too_much_similar_colors:
                save_image("images", image_info,location,str(request_id))
                LOGGER.success(f'Saved Image info for: {location}')
                return True
            else:
                failed_img = Image.open('images_to_filter/check.jpg')
                failed_img.save(f'images_to_filter/discarded/{get_last_discarded()}.jpg')
                LOGGER.error(f'Cannot save image. It is now in images_to_filter/discared/ ')
                count -= 1
        except:
            LOGGER.error(f'Could not save the info of the image for: {location}')
            count -= 1

    quit_driver(driver)

# saving function
def save_image(tableName,image_info,tag,request_id ):
    image_link = image_info['image_link']
    geo_link = image_info['geo_link']
    geolocation = image_info['geolocation']
    caption = image_info['caption']
    DB.insert(tableName,"null",request_id,image_link, geolocation, geo_link,caption,tag, DATE)

#creating the table
def create_table(tableName):
    DB.add_table(tableName,image_id="INTEGER PRIMARY KEY AUTOINCREMENT",request_id='request_id',image_link="text",
            geolocation="text",geo_link="text",caption="text" , tag="text",date_retrieved="text")

find_a_post('bali', 1, 1)