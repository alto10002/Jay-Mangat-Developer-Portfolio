import pandas as pd
from pathlib import Path
from dotenv import load_dotenv
import requests
import os
import time

load_dotenv(dotenv_path=Path(__file__).resolve().parents[2] / ".env")

FILE = Path(__file__).resolve().parents[2] / "data" / "zstd.parquet"
all_recipes = pd.read_parquet(FILE, engine="pyarrow")


# @profile
def generate_recipes(user_ingredients):
    filtered_recipes = all_recipes[
        all_recipes["ingredients"].map(
            lambda ingr: ingredient_match(ingr, user_ingredients)
        )
    ]

    return filtered_recipes


# Matches user's 'tomato' to recipe's 'diced tomato' resulting in more recipes
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


def google_links_wrapper(filtered_recipes):
    filtered_recipes_sample = filtered_recipes.sample(3)
    filtered_recipes_sample["ingredients"] = filtered_recipes_sample[
        "ingredients"
    ].apply(lambda s: [i.capitalize() for i in s])
    filtered_recipes_sample[["image_url", "page_url"]] = filtered_recipes_sample[
        "name"
    ].apply(lambda name: pd.Series(add_google_links(name)))
    return filtered_recipes_sample.to_dict(orient="records")


# # Testing generate timings/different ingredient combinations
# t1 = time.perf_counter()
# generated = generate_recipes({"tomato"})
# t2 = time.perf_counter()
# print(f"{len(generated)} {t2-t1}")

# t1 = time.perf_counter()
# generated = generate_recipes({"chicken"})
# t2 = time.perf_counter()
# print(f"{len(generated)} {t2-t1}")

# t1 = time.perf_counter()
# generated = generate_recipes({"garlic"})
# t2 = time.perf_counter()
# print(f"{len(generated)} {t2-t1}")

# t1 = time.perf_counter()
# generated = generate_recipes({"cheese"})
# t2 = time.perf_counter()
# print(f"{len(generated)} {t2-t1}")

# t1 = time.perf_counter()
# generated = generate_recipes({"rice"})
# t2 = time.perf_counter()
# print(f"{len(generated)} {t2-t1}")

# t1 = time.perf_counter()
# generated = generate_recipes({"tomato", "chicken", "garlic", "cheese"})
# t2 = time.perf_counter()
# print(f"{len(generated)} {t2-t1}")

# links = google_links_wrapper(generated)
# print(links)
