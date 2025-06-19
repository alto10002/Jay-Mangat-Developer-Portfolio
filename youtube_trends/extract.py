import requests
import os
from pathlib import Path
from dotenv import load_dotenv
import pandas as pd


def fetch_trending_videos(region):
    # Load local .env if it exists (for local dev)
    dotenv_path = Path(__file__).resolve().parents[1] / "backend" / ".env"
    if dotenv_path.exists():
        load_dotenv(dotenv_path=dotenv_path)

    # Read API key from env
    API_KEY = os.getenv("YOUTUBE_API")
    if not API_KEY:
        raise ValueError(
            "Missing YOUTUBE_API. Set it as a GitHub Secret or in your .env file."
        )

    URL = "https://www.googleapis.com/youtube/v3/videos"

    params = {
        "part": "snippet,statistics,contentDetails",
        "chart": "mostPopular",
        "regionCode": region,
        "maxResults": 50,
        "key": API_KEY,
    }

    response = requests.get(URL, params=params)
    data = response.json()
    # print(data)

    rows = []
    for item in data["items"]:
        rows.append(
            {
                "video_id": item["id"],
                "publish_date": item["snippet"]["publishedAt"],
                "tags": item["snippet"].get("tags", []),
                "categoryid": item["snippet"]["categoryId"],
                "duration": item["contentDetails"]["duration"],
                "views": int(item["statistics"]["viewCount"]),
                "title": item["snippet"]["title"],
                "country": region,
            }
        )

    df = pd.DataFrame(rows)
    # df.to_csv("extract.csv", index=False)
    # status_checker(response) # get request error checking
    return df


def status_checker(r):
    if r.status_code != 200:
        print(f"Failed with status Code: {r.status_code}")
        print(r.text)


# print(fetch_trending_videos("US"))
