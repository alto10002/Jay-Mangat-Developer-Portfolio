from pathlib import Path
from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

COUNTRY_MAP = {
    "Canada": "CA",
    "United States": "US",
    "Mexico": "MX",
    "United Kingdom": "GB",
    "Russia": "RU",
}
CATEGORY_MAP = {
    "Action/Adventure": 30,
    "Anime/Animation": 1,
    "Autos & Vehicles": 2,
    "Classics": 31,
    "Comedy": 23,
    "Documentary": 35,
    "Drama": 36,
    "Education": 27,
    "Entertainment": 24,
    "Family": 37,
    "Film & Animation": 1,
    "Foreign": 38,
    "Gaming": 20,
    "Horror": 39,
    "Howto & Style": 26,
    "Movies": 34,
    "Music": 10,
    "News & Politics": 25,
    "People & Blogs": 22,
    "Pets & Animals": 15,
    "Science & Technology": 28,
    "Sci-Fi/Fantasy": 40,
    "Short Movies": 42,
    "Shorts": 43,
    "Shows": 44,
    "Sports": 17,
    "Thriller": 45,
    "Trailers": 46,
    "Travel & Events": 19,
    "Videoblogging": 47,
}

# Only load .env in development
env_path = Path(__file__).resolve().parents[2] / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)

# Use uppercase key with lowercase fallback (if needed)
sql_db_url = os.getenv("SQL_DB_URL")
if not sql_db_url:
    raise ValueError("❌ Missing SQL_DB_URL environment variable.")


def process_filters(filters):
    filters = filters.dict()
    country_filter = [COUNTRY_MAP[c] for c in filters["countries"] if c in COUNTRY_MAP]
    category_filter = [
        CATEGORY_MAP[c] for c in filters["categories"] if c in CATEGORY_MAP
    ]

    engine = create_engine(sql_db_url)

    query = text(
        """
        SELECT *
        FROM videos
        WHERE categoryid = ANY(:categories)
          AND trending_date BETWEEN :start AND :end
          AND country = ANY(:countries)
    """
    )

    with engine.connect() as conn:
        result = conn.execute(
            query,
            {
                "categories": category_filter,
                "countries": country_filter,
                "start": filters["startDate"],
                "end": filters["endDate"],
            },
        )

        rows = result.fetchall()
        return [dict(row._mapping) for row in rows]
    return rows
