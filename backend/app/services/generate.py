import pandas as pd
from pathlib import Path
from dotenv import load_dotenv
import requests
import os
import time

t = time.perf_counter()

load_dotenv(dotenv_path=Path(__file__).resolve().parents[2] / ".env")

FILE = Path(__file__).resolve().parents[2] / "data" / "zstd.parquet"
df = pd.read_parquet(FILE, engine="pyarrow")
t0 = time.perf_counter()
# Make ingredients lowercase to assist matching with ingredient list
df["ingredients"] = df["ingredients"].map(lambda ingr: set(map(str.lower, ingr)))
# Force steps to list for ease with JSON
df["steps"] = df["steps"].apply(lambda x: x.tolist() if hasattr(x, "tolist") else x)
t1 = time.perf_counter()


# @profile
def generate(user_ingredients):
    generated_recipes = df[df["ingredients"].map(user_ingredients.issubset)]
    t2 = time.perf_counter()
    recipes_sample = generated_recipes.sample(3)
    t3 = time.perf_counter()
    # Capitalization ingredients so it looks better on cards
    recipes_sample["ingredients"] = recipes_sample["ingredients"].apply(
        lambda s: [i.capitalize() for i in s]
    )
    t4 = time.perf_counter()
    # Adding image/page URLs to dictionary to pull them out in RecipeCard
    recipes_sample[["image_url", "page_url"]] = recipes_sample["name"].apply(
        lambda name: pd.Series(google_searches(name))
    )
    t5 = time.perf_counter()
    # print(f"Read parquet: {t0 - t:.4f}s")
    # print(f"Preprocess:   {t1 - t0:.4f}s")
    # print(f"Filter:       {t2 - t1:.4f}s")
    # print(f"Get 3 samples:       {t3 - t2:.4f}s")
    # print(f"Capitalize:       {t4 - t3:.4f}s")
    # print(f"Google links:       {t5 - t4:.4f}s")
    return recipes_sample.to_dict(orient="records")


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

    # print(f"Google API raw response: {data}")  # Log full response
    if "items" not in data or not data["items"]:
        return "no image url", "no page url"

    image_url = data["items"][0]["link"]
    page_url = data["items"][0]["image"]["contextLink"]

    return image_url, page_url


# Test
# print(generate({"coconut", "kiwi"}))
