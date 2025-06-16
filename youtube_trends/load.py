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
                video_id TEXT NOT NULL,
                publish_date TIMESTAMP,
                tags TEXT[],
                categoryid INTEGER,
                duration INTEGER,
                views INTEGER,
                country TEXT,
                PRIMARY KEY (video_id, publish_date, country)
            );
        """
            )
        )

        for _, row in df.iterrows():
            result = conn.execute(
                text(
                    """
                    INSERT INTO videos (
                        video_id, publish_date, tags, categoryid, duration, views, country
                    )
                    VALUES (
                        :video_id, :publish_date, :tags, :categoryid, :duration, :views, :country
                    )
                    ON CONFLICT (video_id, publish_date, country) DO NOTHING
                    RETURNING video_id;
                """
                ),
                {
                    "video_id": row["video_id"],
                    "publish_date": row["publish_date"],
                    "tags": row["tags"],
                    "categoryid": row["categoryid"],
                    "duration": row["duration"],
                    "views": row["views"],
                    "country": row["country"],
                },
            )

            if result.fetchone():
                inserted += 1
            else:
                skipped += 1

    print(f"Inserted: {inserted} row(s)")
    print(f"Skipped (duplicates): {skipped} row(s)")

    return
