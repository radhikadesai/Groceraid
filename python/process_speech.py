import json
import sys
import pickle

stopwords = pickle.load(open("python/resources/stopwords.p", "rb"))
foods = pickle.load(open("python/resources/foods.p", "rb"))


# list of foods: http://www.mrsjonesroom.com/jones/foodalphabet.html
def process_user_input(text):
    candidates = text.split(" ")
    result = dict()
    count = 1
    for word in candidates:
        if word.lower() not in stopwords:
            if word.isdigit():
                count = int(word)
            elif word.lower() in foods:
                result[word] = count
                count = 1
    return result

data = json.loads(sys.argv[1])
data['list_of_foods'] = process_user_input(data['user_input'])
data = json.dumps(data)
print(data)
sys.stdout.flush()