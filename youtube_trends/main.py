from extract import fetch_trending_videos
from transform import transform
from load import load_to_db
from dotenv import load_dotenv
from pathlib import Path
import os


def main():
    load_dotenv(dotenv_path=Path(__file__).resolve().parents[1] / "backend" / ".env")
    sql_db_url = os.getenv("sql_db_url")
    regions = ["US", "CA", "MX"]

    for region in regions:
        videos = fetch_trending_videos(region)
        transformed_videos = transform(videos)
        load_to_db(transformed_videos, sql_db_url)
        print(f"Loaded {len(transformed_videos)} videos for region {region}")

    return


if __name__ == "__main__":
    main()
