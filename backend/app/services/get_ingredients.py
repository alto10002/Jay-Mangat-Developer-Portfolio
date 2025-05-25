import csv
from pathlib import Path

def get_ingredients(number):
    number = number + ".csv"
    path = Path(__file__).parent.parent.parent / 'data' / 'updated_ingredients.csv'
    
    with open(path, newline='') as csvfile:
        reader = csv.reader(csvfile)
        return [{"value":row[0], "label": row[0].title()} for row in reader]
    
# print(get_ingredients("1000"))