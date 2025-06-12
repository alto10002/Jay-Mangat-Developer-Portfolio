from sqlalchemy import create_engine, text


def load_to_db(df, db_url):

    engine = create_engine(db_url)

    # Creates table with constraints if it doesnt already exist
    with engine.connect() as conn:
        conn.execute(
            text(
                """
            CREATE TABLE IF NOT EXISTS videos (
                video_id TEXT NOT NULL,
                publish_date TIMESTAMP,
                tags TEXT[],
                categoryID INTEGER,
                duration INTEGER,
                views INTEGER,
                PRIMARY KEY (video_id, publish_date)
            );
        """
            )
        )

    df.to_sql("videos", engine, if_exists="append", index=False)
    return
