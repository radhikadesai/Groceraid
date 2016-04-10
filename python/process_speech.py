import json
import sys
import pickle

stopwords = pickle.load(open("python/resources/stopwords.p", "rb"))
foods = pickle.load(open("python/resources/foods.p", "rb"))


# list of foods: http://www.mrsjonesroom.com/jones/foodalphabet.html
def process_user_input(text):
    candidates = text.split(" ")
    return [word for word in candidates if word.lower() in foods and word.lower() not in stopwords]

data = json.loads(sys.argv[1])
data['list_of_foods'] = process_user_input(data['user_input'])
data = json.dumps(data)
print(data)
sys.stdout.flush()