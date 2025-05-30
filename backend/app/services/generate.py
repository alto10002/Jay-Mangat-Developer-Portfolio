import pandas as pd
from pathlib import Path
import numpy as np
from dotenv import load_dotenv
import requests
import os
from io import BytesIO
import boto3

load_dotenv(dotenv_path=Path(__file__).resolve().parents[2] / ".env")


def generate(chosen_ingredients):
    if os.getenv("USE_S3", "false").lower() == "true":
        # Load from S3
        s3_client = boto3.client(
            's3',
            aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
            aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
            region_name=os.getenv("AWS_REGION")
        )
        bucket_name = "your-bucket-name"
        file_key = "path/to/yourfile.parquet"

        response = s3_client.get_object(Bucket=bucket_name, Key=file_key)
        file_content = response['Body'].read()
        df = pd.read_parquet(BytesIO(file_content))
    else:
        path = Path(__file__).resolve().parents[2] / "data" / "new_cleaned_recipes.csv"
        df = pd.read_csv(path)
    df = df.replace([np.inf, -np.inf, np.nan], None)

    df1 = df[
        df["ingredients"].apply(
            lambda lst: all(ingredient in lst for ingredient in chosen_ingredients)
        )
    ]

    chosen_recipes = df1.sample(3)

    # Capitalization so it looks better on cards
    chosen_recipes["ingredients"] = chosen_recipes["ingredients"].apply(
        lambda s: [i.capitalize() for i in eval(s)]
    )
    chosen_recipes["steps"] = chosen_recipes["steps"].apply(
        lambda s: [step.capitalize() for step in eval(s)]
    )

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
# recipes = generate(['chicken','butter'])
# print(recipes)