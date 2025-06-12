import requests
import json
import os
from pathlib import Path
from dotenv import load_dotenv
import pandas as pd


def load_video_data(region):
    load_dotenv(dotenv_path=Path(__file__).resolve().parents[1] / "backend" / ".env")
    API_KEY = os.getenv("YOUTUBE_API")
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
                "publish_date": item["snippet"]["publishedAt"],
                "tags": item["snippet"].get("tags", []),
                "categoryID": item["snippet"]["categoryId"],
                "duration": item["contentDetails"]["duration"],
                "views": int(item["statistics"]["viewCount"]),
            }
        )

    df = pd.DataFrame(rows)
    df.to_csv("extract.csv", index=False)

    # status_checker(response) # get request error checking

    return


def status_checker(r):
    if r.status_code != 200:
        print(f"Failed with status Code: {r.status_code}")
        print(r.text)


load_video_data("US")

# {
#     "items": [
#         {
#             "snippet": {
#                 "publishedAt": "2025-06-11T15:00:24Z",
#                 "tags": ["Ryan", "Trahan"],
#                 "categoryId": "24",
#             },
#             "contentDetails": {
#                 "duration": "PT21M31S",
#             },
#             "statistics": {
#                 "viewCount": "1202100",
#             },
#         }
#     ],
# }
