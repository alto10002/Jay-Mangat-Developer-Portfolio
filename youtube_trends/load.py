from sqlalchemy import create_engine, text


def load_to_db(df, db_url):
    engine = create_engine(db_url)

    inserted = 0
    skipped = 0

    with engine.begin() as conn:
        conn.execute(
            text(
                """
            CREATE TABLE IF NOT EXISTS videos (
                trending_date TIMESTAMP,
                country TEXT,
                title TEXT,
                video_id TEXT NOT NULL,
                upload_date TIMESTAMP,
                upload_time TIME,
                tags TEXT[],
                categoryid INTEGER,
                duration INTEGER,
                views INTEGER,
                PRIMARY KEY (video_id, upload_date, trending_date, country)
            );
        """
            )
        )

        for _, row in df.iterrows():
            result = conn.execute(
                text(
                    """
                    INSERT INTO videos (
                        trending_date, country, title, video_id, upload_date, upload_time, tags, categoryid, duration, views
                    )
                    VALUES (
                        :trending_date, :country, :title, :video_id, :upload_date, :upload_time, :tags, :categoryid, :duration, :views
                    )
                    ON CONFLICT (video_id, upload_date, trending_date, country) DO NOTHING
                    RETURNING video_id;
                """
                ),
                {
                    "trending_date": row["trending_date"],
                    "country": row["country"],
                    "title": row["title"],
                    "video_id": row["video_id"],
                    "upload_date": row["upload_date"],
                    "upload_time": row["upload_time"],
                    "tags": row["tags"],
                    "categoryid": row["categoryid"],
                    "duration": row["duration"],
                    "views": row["views"],
                },
            )

            if result.fetchone():
                inserted += 1
            else:
                skipped += 1

    print(f"Inserted: {inserted} row(s)")
    print(f"Skipped (duplicates): {skipped} row(s)")

    return
