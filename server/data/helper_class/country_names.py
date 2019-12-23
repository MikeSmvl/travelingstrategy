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
        else:
            print("The following is not an official country :", key)
    return iso

def find_iso_of_country(country):
    iso = ""
    all_names, all_official_names = load_all_names()
    try:
        iso = find_iso(country,all_names,all_official_names)

    except LookupError:
        print("The following is not an official country :", country)

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
    if (re.search('Laos',name)):
        return "Lao People's Democratic Republic"
    elif (name == 'Macau'):
        return "Macao"
    elif (re.search('Republic of Korea',name) or re.search('South Korea',name)):
        return "Korea, Republic of"
    elif (re.search('North Korea',name)):
        return "Korea, Democratic People's Republic of"
    if (name == 'Cape Verde'):
        return "Cabo Verde"
    elif (name == 'Democratic Republic of the Congo'):
        return "Congo, The Democratic Republic of the"
    elif (re.search('Ivory Coast',name)):
        return "Côte d'Ivoire"
    elif (re.search('Sovereign Military Order of Malta',name)):
        return "Malta"
    elif (re.search('East Timor',name)):
        return "Timor-Leste"
    elif (re.search('Sahrawi Arab Democratic Republic',name)):
        return "Western Sahara"
    elif (re.search('Sovereign Military Order of Malta',name)):
        return "Malta"
    elif (name == 'Lichenstein'):
        return "Liechtenstein"
    elif (name == 'Trinidad & Tobago'):
        return "Trinidad and Tobago"

    for n in all_names:
        if (re.search(n,name)):
            return n

    for n in all_official_names:
        if (re.search(n,name)):
            return n

    return ""



