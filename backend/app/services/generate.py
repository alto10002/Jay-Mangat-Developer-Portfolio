import pandas as pd
from pathlib import Path
import numpy as np
from dotenv import load_dotenv
import requests
import os

load_dotenv(dotenv_path=Path(__file__).resolve().parents[2] / ".env")


def generate(recipe_IDs):
    path = Path(__file__).resolve().parents[2] / "data" / "new_cleaned_recipes.csv"
    df = pd.read_csv(path)
    # df = df.replace([np.inf, -np.inf, np.nan], None)

    # Old code that checks between all ingredients
    # df1 = df[
    #     df["ingredients"].apply(
    #         lambda lst: all(ingredient in lst for ingredient in chosen_ingredients)
    #     )
    # ]
    # recipe_IDs = int(recipe_IDs)
    # print(type(recipe_IDs))
    recipe_IDs = set(recipe_IDs)
    # print(df.head())
    df1 = df[df["id"].isin(recipe_IDs)]

    chosen_recipes = df1.sample(3)

    # Adding image/page URLs to dictionary to pull them out in RecipeCard
    chosen_recipes[["image_url", "page_url"]] = chosen_recipes["name"].apply(
        lambda name: pd.Series(google_searches(name))
    )
    # convert to dicts
    return chosen_recipes.to_dict(orient="records")


def google_searches(recipe_name):
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    GOOGLE_CX = os.getenv("GOOGLE_CX")

    url = (
        f"https://www.googleapis.com/customsearch/v1"
        f"?key={GOOGLE_API_KEY}"
        f"&cx={GOOGLE_CX}"
        f"&q={recipe_name} recipe"
        f"&searchType=image"
        f"&num=1"
    )

    response = requests.get(url)
    data = response.json()

    image_url = data["items"][0]["link"]
    page_url = data["items"][0]["image"]["contextLink"]

    return image_url, page_url


# # Test
# recipes = generate([137739, 112140, 8559, 83873])
# print(recipes)
# print(recipes[0])
# print(type(137739))
