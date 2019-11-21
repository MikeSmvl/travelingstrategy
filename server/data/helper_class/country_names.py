import json
import pycountry
import re


def load_all_names():
    countries = list(pycountry.countries)
    all_names = []
    all_official_names = []

    countries = list(pycountry.countries)
    for country in countries:
        all_names.append(country.name)
        try:
            all_official_names.append(country.official_name)
            all_names.append(country.name)
        except: continue

    return all_names,all_official_names

def find_iso(key, all_names,all_official_names):
    iso = ""
    try:
        country = pycountry.countries.search_fuzzy(key)[0]
        iso = country.alpha_2

    except LookupError:
        new_key = handle_iso_error(key, all_names,all_official_names)
        if (new_key!=""):
            iso = find_iso(new_key,all_names,all_official_names)

    return iso

def find_all_iso(data):
    all_names, all_official_names = load_all_names()
    for key in data:
        try:
            iso = find_iso(key,all_names,all_official_names)
            data_of_key = data[key]
            data_of_key['country-iso'] = iso

        except:
            print("ERROR: ISO not found for",key)

    return data


def handle_iso_error(name, all_names,all_official_names):

    for n in all_names:
        if (re.search(n,name)):
            return n

    for n in all_official_names:
        if (re.search(n,name)):
            return n

    if (name == 'Laos'):
        return "Lao People's Democratic Republic"
    elif (name == 'Macau'):
        return "Macao"
    elif (re.search('Republic of Korea',name)):
        return "Korea, Republic of"

    return ""



