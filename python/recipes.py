from lxml import html
import requests
import pykka
from random import choice, shuffle, randint
import copy
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
import pickle
import json
import sys
import logging

logger = logging.getLogger('scope.name')

file_log_handler = logging.FileHandler('logfile.log')
logger.addHandler(file_log_handler)

stderr_log_handler = logging.StreamHandler()
logger.addHandler(stderr_log_handler)

# nice output format
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
file_log_handler.setFormatter(formatter)
stderr_log_handler.setFormatter(formatter)

descriptors = pickle.load(open("python/resources/food_descriptors.p", "rb"))
stopwords = pickle.load(open("python/resources/stopwords.p", "rb"))

#//meta[contains(@property, 'og:image')]//@content

class Worker(pykka.ThreadingActor):
    def on_receive(self, message):
        page = requests.get(message['link'])
        tree = html.fromstring(page.content)
        response_title = tree.xpath('//h1')
        recipe = dict()
        recipe['name'] = response_title[0].text
        recipe['link'] = message['link']
        recipe['ingredients'] = list()
        response_ingredients = tree.xpath('//span[contains(@class, \'recipe-ingred_txt added\')]')
        recipe['picture'] = tree.xpath('//meta[contains(@property, \'og:image\')]//@content')[0]
        for elm in response_ingredients:
            if elm.text not in "Add all ingredients to list":
                recipe['ingredients'].append(elm.text)
        return recipe


def extract_recipes(ingredient_list, count=50):
    """
    Extracts recipes for a list of ingredients *Multi-Threaded Solution*
    :param count: number of recipes to extract
    :param ingredient_list: list of ingredients to serve the initial query
    :return: Dictionary of recipes (includes link and ingredient list for each recipe)
    """
    query = ", ".join(ingredient_list)
    # Initiate the search
    base_url = "http://allrecipes.com"
    entry = base_url + "/search/results/?wt=" + query + "&sort=re"
    start_page = requests.get(entry)
    tree = html.fromstring(start_page.content)
    response = tree.xpath('//article[contains(@class, \'grid-col--fixed-tiles\')]//@href')
    # Extract search result links
    links = set()
    for r in response:
        if "/recipe/" in str(r):
            links.add(base_url + r)
    # Spawn workers to process each link
    links = list(links)
    shuffle(links)
    futures, workers = [], []
    for i in xrange(min(count, len(links))):
        message = {'link': links[i]}
        actor_ref = Worker.start()
        workers.append(actor_ref)
        futures.append(actor_ref.ask(message, block=False))
    # Collect and merge worker answers
    recipes = dict()
    answers = pykka.get_all(futures)
    for answer in answers:
        recipes[answer['name']] = dict()
        recipes[answer['name']]['ingredients'] = answer['ingredients']
        recipes[answer['name']]['link'] = answer['link']
        recipes[answer['name']]['picture'] = answer['picture']
    for worker in workers:
        worker.stop()
    return recipes


def clean(sentence, splitter=","):
    if ":" in sentence:
        return ""
    partials = sentence.split(splitter)
    words = partials[0].split(" ")
    cleaned = []
    for word in words:
        if word.isalpha() and word.lower() not in descriptors:
            cleaned.append(word.lower())
        if word in stopwords:
            return ""
    return " ".join(cleaned)


# def suggest(food_list):
#     foods = copy.deepcopy(food_list)
#     vect = TfidfVectorizer(min_df=1)
#     suggestions = []
#     res = []
#     while len(foods) > 0:
#         query = []
#         while len(query) < 3 and len(foods) > 0:
#             item = choice(foods)
#             query.append(item)
#             foods.remove(item)
#         recipes = extract_recipes(query, 3)
#         for recipe in recipes:
#             res.append({'name': recipe, 'link': recipes[recipe]['link'], 'picture': recipes[recipe]['picture']})
#         for recipe in recipes:
#             for ingredient in recipes[recipe]['ingredients']:
#                 cleaned = clean(ingredient)
#                 if len(cleaned) > 0:
#                     suggestions.append(clean(ingredient))
#     tf_idf = vect.fit_transform(suggestions)
#     m = (tf_idf * tf_idf.T).A
#     sums = np.sum(m, axis=0)
#     sorted_suggestions = [x for y, x in sorted(zip(sums, suggestions), reverse=True) if y > 1]
#     suggestions = []
#     for suggestion in sorted_suggestions:
#         if suggestion not in suggestions and not any(x in suggestion for x in food_list):
#             suggestions.append(suggestion)
#     return {'recipes' : res, 'suggestions': suggestions}


def get_recipes(food_list):
    foods = copy.deepcopy(food_list)
    recipes = []
    tries = 0
    while len(recipes) < 1 and tries < 5:
        shuffle(foods)
        recipes = extract_recipes(foods[:randint(1, 3)], 3)
        tries += 1
    res = []
    suggestions = []
    for recipe in recipes:
        res.append({'name': recipe, 'link': recipes[recipe]['link'], 'picture': recipes[recipe]['picture']})
        for ingredient in recipes[recipe]['ingredients']:
            cleaned = clean(ingredient)
            if len(cleaned) > 0:
                suggestions.append(cleaned)
    vect = TfidfVectorizer(min_df=1)
    tf_idf = vect.fit_transform(suggestions)
    m = (tf_idf * tf_idf.T).A
    sums = np.sum(m, axis=0)
    sorted_entries = [(y, x) for y, x in sorted(zip(sums, suggestions), reverse=True) if y > 1.2]
    suggestions = []
    repeats = []
    for frequency, suggestion in sorted_entries:
        if suggestion not in repeats:
            suggestions.append({'ingredient': suggestion, 'frequency': int(frequency)})
            repeats.append(suggestion)
    return {'recipes': res, 'suggestions': suggestions}


data = json.loads(sys.argv[1])
data['result'] = get_recipes(data['user_input'])
data = json.dumps(data)

# logger.error(data)

print data
sys.stdout.flush()

