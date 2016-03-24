import googlemaps
import json
import sys


def extract_distances(location='1309 NW 5th Ave, Gainesville, FL', key='AIzaSyCyKFoosxiZo-j_i5TE113FbOtGnj1Ls2Q'):
    """
    Extracts possible distance measures to all nearby grocery stores from a specified location
    :param location: String address (this will be long/lat coordinates in future)
    :param key: API key; Get your own if you don't already have one
    :return: Distance metrics dictionary (includes time in seconds and distance in meters from origin to each store)
    """
    maps = googlemaps.Client(key)
    # Convert address to long/lat coordinates
    origin = maps.geocode(location)
    origin = (origin[0][u'geometry'][u'location'][u'lat'], origin[0][u'geometry'][u'location'][u'lng'])
    # Acquire nearby stores
    nearby_stores = maps.places('grocery', origin, language='English', radius=10)
    store_addresses = []
    time_debt = dict()
    for store in nearby_stores[u'results']:
        store_addresses.append((store[u'name'], store[u'formatted_address']))
        time_debt[store[u'name']] = dict()
        time_debt[store[u'name']]['address'] = store[u'formatted_address']
    # Compute distance from origin to each store
    distances = maps.distance_matrix(origin, [address for (name, address) in store_addresses],
                                      mode="driving", language='English')
    dist_list = []
    for element in distances[u'rows'][0][u'elements']:
        dist_list.append((element[u'duration'][u'value'], element[u'distance'][u'value']))
    idx = 0
    for (name, address) in store_addresses:
        time_debt[name]['seconds'] = dist_list[idx][0]
        time_debt[name]['meters'] = dist_list[idx][1]
        idx += 1
    return time_debt


data = json.loads(sys.argv[1])
data['result'] = extract_distances(data['user_input'])
data = json.dumps(data)
print data
sys.stdout.flush()