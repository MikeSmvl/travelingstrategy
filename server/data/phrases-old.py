from googletrans import Translator
import googletrans
from lib.database import Database
from helper_class.flags import Flags
from helper_class.logger import Logger

DB = Database('countries.sqlite')


PHRASES = {
    'Thank you',
    'Hello',
    'Goodbye',
    'Excuse me',
    'May I have ...',
    'How much does it cost?',
    'Bathroom',
    'Yes',
    'No',
    'Where is ...',
    'Help',
    'Right',
    'Left',
    'Straight',
    'To Turn ...',
    'Hospital',
    'Ambulance',
    'Police',
    'Help',
    'Entry',
    'Exit'
}

DO_NOT_SPEAK = "I don't speak "

TRANSLATOR = Translator()

def create_table():
    DB.drop_table('phrases')
    DB.add_table('phrases',language_iso='text',language='text',phrase='text',translated_phrase='text',pronunciation='text')

def translate(lg,language):
    for phrase in PHRASES:
        result = TRANSLATOR.translate(phrase, src='en', dest=lg)
        translated_phrase = result
        pronunciation = result.pronunciation
        print(translated_phrase, pronunciation)


def translate_phrases():
    create_table()
    languages = googletrans.LANGUAGES
    c = 1
    for lg in languages:
        c += 1
        if c < 5:
            translate(lg,languages[lg])


def save_phrases():
    pass

# translate_phrases()
translate('ar','arabic')
