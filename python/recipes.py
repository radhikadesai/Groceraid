from lxml import html
import requests
import pykka
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
        for elm in response_ingredients:
            if elm.text not in "Add all ingredients to list":
                recipe['ingredients'].append(elm.text)
        return recipe


def extract_recipes(ingredient_list):
    """
    Extracts recipes for a list of ingredients *Multi-Threaded Solution*
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
    for i in xrange(min(10, len(response))):
        if "recipe" in str(response[i]):
            links.add(base_url + response[i])
    # Spawn workers to process each link
    futures, workers = [], []
    for link in links:
        message = {'link': link}
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
    for worker in workers:
        worker.stop()
    return recipes


data = json.loads(sys.argv[1])
data['result'] = extract_recipes(data['user_input'])
data = json.dumps(data)

# logger.error(data)

print data
sys.stdout.flush()

