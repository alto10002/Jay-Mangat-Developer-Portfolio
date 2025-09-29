import csv
from pathlib import Path


def get_ingredients():
    path = Path(__file__).parents[2] / "data" / "ingredient_dropdown.csv"

    with open(path, newline="") as csvfile:
        reader = csv.reader(csvfile)
        return [{"value": row[0], "label": row[0].title()} for row in reader]


# print(get_ingredients()[0])
