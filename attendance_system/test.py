import requests

data = requests.get('https://shoes-map.herokuapp.com/location/')

print(data.text)