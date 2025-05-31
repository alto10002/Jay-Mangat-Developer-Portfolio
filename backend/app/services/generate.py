import pandas as pd
from pathlib import Path
import numpy as np
from dotenv import load_dotenv
import requests
import os
import io
import boto3
from datetime import datetime
from memory_profiler import profile

load_dotenv(dotenv_path=Path(__file__).resolve().parents[2] / ".env")

@profile
def generate(chosen_ingredients):
    print(f'Getting dataset at {datetime.utcnow().isoformat()}')
    if os.getenv("USE_S3", "false").lower() == "true":
        print(f'Using S3 at {datetime.utcnow().isoformat()}')
        s3_client = boto3.client(
        's3',
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
        region_name=os.getenv("AWS_REGION")
        )
        bucket_name = 'react-recipes-data'
        file_key = 'new_cleaned_recipes.csv'
        # file_key = 'smaller_recipes.csv'

        response = s3_client.get_object(Bucket=bucket_name, Key=file_key)
        data = response['Body'].read()
        df = pd.read_csv(io.BytesIO(data))
    else:
        print(f'Using local data at {datetime.utcnow().isoformat()}')
        path = Path(__file__).resolve().parents[2] / "data" / "new_cleaned_recipes.csv"
        # path = Path(__file__).resolve().parents[2] / "data" / "smaller_recipes.csv"
        df = pd.read_csv(path)
    
    print(f'Replacing nulls at {datetime.utcnow().isoformat()}')
    df = df.replace([np.inf, -np.inf, np.nan], None)
    print(f'Beginning filtering at  {datetime.utcnow().isoformat()}')
    df1 = df[
        df["ingredients"].apply(
            lambda lst: all(ingredient in lst for ingredient in chosen_ingredients)
        )
    ]
    print(f'Ending filtering at {datetime.utcnow().isoformat()}')
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
    print(f'Returning records at {datetime.utcnow().isoformat()}')
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