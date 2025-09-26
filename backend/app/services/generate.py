import pandas as pd
from pathlib import Path
from dotenv import load_dotenv
import requests
import os
import time

load_dotenv(dotenv_path=Path(__file__).resolve().parents[2] / ".env")

FILE = Path(__file__).resolve().parents[2] / "data" / "zstd.parquet"
all_recipes = pd.read_parquet(FILE, engine="pyarrow")
# Make ingredients lowercase to assist matching with ingredient list
all_recipes["ingredients"] = all_recipes["ingredients"].map(
    lambda ingr: set(map(str.lower, ingr))
)
# Force steps to list for ease with JSON
all_recipes["steps"] = all_recipes["steps"].apply(
    lambda x: x.tolist() if hasattr(x, "tolist") else x
)


# @profile
def generate_recipes(user_ingredients):
    filtered_recipes = all_recipes[
        all_recipes["ingredients"].map(
            lambda ingr: ingredient_match(ingr, user_ingredients)
        )
    ]

    recipe_count = len(filtered_recipes)
    filtered_recipes_sample = filtered_recipes.sample(3)
    # Capitalization ingredients so it looks better on cards
    filtered_recipes_sample["ingredients"] = filtered_recipes_sample[
        "ingredients"
    ].apply(lambda s: [i.capitalize() for i in s])
    return [filtered_recipes_sample, recipe_count]


# helper for fuzzy matching so tomato returns tomatos/cherry tomato/etc.
def ingredient_match(recipe_ingredients, user_ingredients):
    return all(
        any(ui in ingr for ingr in recipe_ingredients) for ui in user_ingredients
    )


def add_google_links(recipe_name):
    t6 = time.perf_counter()

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

    # print(f"Google API raw response: {data}")  # Log full response
    if "items" not in data or not data["items"]:
        return "no image url", "no page url"

    image_url = data["items"][0]["link"]
    page_url = data["items"][0]["image"]["contextLink"]
    t7 = time.perf_counter()
    print(f"Google links:       {t7 - t6:.4f}s")
    return image_url, page_url


def google_links_wrapper(filtered_recipes_sample):
    filtered_recipes_sample[["image_url", "page_url"]] = filtered_recipes_sample[
        "name"
    ].apply(lambda name: pd.Series(add_google_links(name)))
    return filtered_recipes_sample.to_dict(orient="records")


# Testing generate timings/different ingredient combinations
# generated = generate_recipes({"tomato", "chicken", "garlic", "cheese", "pasta"})
# print(generated[0])
# print(generated[1])
# links = google_links_wrapper(generated[0])
# print(links)
