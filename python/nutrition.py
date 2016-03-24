from nutritionix import Nutritionix


def extract_nutrition_data(query):
    nix = Nutritionix(app_id="ac86d1b1", api_key="290ca52d8ffea5cfa546000bb592c349")
    query = nix.search(query).json()
    return query


extract_nutrition_data("pizza")
