import csv
from pathlib import Path

def get_ingredients(number):
    number = number + ".csv"
    path = Path(__file__).parent / 'list_of_ingredients' / number
    
    with open(path, newline='') as csvfile:
        reader = csv.reader(csvfile)
        return [{"value": row[1], "label": row[1].title()} for row in reader]
    
# print(get_ingredients("1000"))