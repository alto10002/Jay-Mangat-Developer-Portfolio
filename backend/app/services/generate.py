import pandas as pd
from pathlib import Path
from dotenv import load_dotenv
import requests
import os
import time
import duckdb

load_dotenv(dotenv_path=Path(__file__).resolve().parents[2] / ".env")

FILE = Path(__file__).resolve().parents[2] / "data" / "zstd.parquet"
all_recipes = pd.read_parquet(FILE, engine="pyarrow", columns=["id", "ingredients"])
recipe_ids = None


def generate_recipes(user_ingredients):
    global recipe_ids
    filtered_recipes = all_recipes[
        all_recipes["ingredients"].map(
            lambda ingr: ingredient_match(ingr, user_ingredients)
        )
    ]
    recipe_ids = filtered_recipes["id"]
    return len(recipe_ids)


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
    # print(f"Google links:       {t7 - t6:.4f}s")
    return image_url, page_url


def google_links_wrapper():
    sampled_ids = recipe_ids.sample(3)

    con = duckdb.connect()
    query = f"""
        SELECT *
        FROM '{FILE}'
        WHERE id IN ({','.join(map(str, sampled_ids))})
    """
    filtered_recipes_sample = con.execute(query).fetchdf()

    filtered_recipes_sample["ingredients"] = filtered_recipes_sample[
        "ingredients"
    ].apply(lambda s: [str(i).capitalize() for i in s])

    filtered_recipes_sample[["image_url", "page_url"]] = filtered_recipes_sample[
        "name"
    ].apply(lambda name: pd.Series(add_google_links(name)))

    result = []
    for _, row in filtered_recipes_sample.iterrows():
        result.append(
            {
                "id": int(row["id"]),
                "name": str(row["name"]),
                "ingredients": row["ingredients"],
                "image_url": row["image_url"],
                "page_url": row["page_url"],
                "minutes": int(row["minutes"]),
                "steps": list(row["steps"]),
                "n_ingredients": int(row["n_ingredients"]),
            }
        )
    return result


# generated = generate_recipes({"tomato", "chicken", "garlic", "cheese"})
# res = google_links_wrapper()
# print(res)
