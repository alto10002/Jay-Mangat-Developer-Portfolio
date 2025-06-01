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

# @profile
def generate(chosen_ingredients):
    def get_data_source():
        if os.getenv("USE_S3", "false").lower() == "true":
            print(f'Using S3 at \t {datetime.utcnow().isoformat()}')
            s3_client = boto3.client(
                's3',
                aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
                aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
                region_name=os.getenv("AWS_REGION")
            )
            bucket_name = 'react-recipes-data'
            file_key = 'new_cleaned_recipes.csv'
            response = s3_client.get_object(Bucket=bucket_name, Key=file_key)
            return io.BytesIO(response['Body'].read())  # Unified return
        else:
            print(f'Using local data at \t {datetime.utcnow().isoformat()}')
            return Path(__file__).resolve().parents[2] / "data" / "new_cleaned_recipes.csv"
        
    
    data_source = get_data_source()
    df = pd.read_csv(data_source, usecols=['id', 'ingredients'])
    df = df.replace([np.inf, -np.inf, np.nan], None)
    df1 = df[df["ingredients"].apply(lambda lst: all(ingredient in lst for ingredient in chosen_ingredients))]

    chosen_recipes = df1.sample(3)    
    chosen_ids = chosen_recipes['id'].tolist()

    # Rewind S3 BytesIO if necessary
    if isinstance(data_source, io.BytesIO):
        data_source.seek(0)  # Rewind for second read

    filtered_df = pd.concat(
        chunk[chunk['id'].isin(chosen_ids)]
        for chunk in pd.read_csv(data_source, chunksize=10000)
    )

    # Capitalization so it looks better on cards
    filtered_df["ingredients"] = filtered_df["ingredients"].apply(
        lambda s: [i.capitalize() for i in eval(s)]
    )
    filtered_df["steps"] = filtered_df["steps"].apply(
        lambda s: [step.capitalize() for step in eval(s)]
    )
    # Adding image/page URLs to dictionary to pull them out in RecipeCard
    filtered_df[["image_url", "page_url"]] = filtered_df["name"].apply(
        lambda name: pd.Series(google_searches(name))
    )
    print(f'Returning records at \t {datetime.utcnow().isoformat()}')
    # convert to dicts
    return filtered_df.to_dict(orient="records")


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
    
    print(f"Google API raw response: {data}")  # Log full response
    if "items" not in data or not data["items"]:
        return 'no image url', 'no page url'

    image_url = data["items"][0]["link"]
    page_url = data["items"][0]["image"]["contextLink"]

    return image_url, page_url

# # Test
# recipes = generate(['chicken','butter'])
# print(recipes)