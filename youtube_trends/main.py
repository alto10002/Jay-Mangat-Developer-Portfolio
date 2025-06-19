from extract import fetch_trending_videos
from transform import transform
from load import load_to_db
from dotenv import load_dotenv
from pathlib import Path
import os


def main():
    # Load local .env if it exists (for local dev)
    dotenv_path = Path(__file__).resolve().parents[1] / "backend" / ".env"
    if dotenv_path.exists():
        load_dotenv(dotenv_path=dotenv_path)
    sql_db_url = os.getenv("SQL_DB_URL")
    regions = ["US", "CA", "MX", "GB", "RU"]

    if not sql_db_url:
        raise ValueError(
            "Database URL not provided. Set SQL_DB_URL as env variable or in .env file."
        )

    for region in regions:
        print(f"For region: {region}")
        videos = fetch_trending_videos(region)
        transformed_videos = transform(videos)
        load_to_db(transformed_videos, sql_db_url)

    return


if __name__ == "__main__":
    main()
