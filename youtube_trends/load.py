from sqlalchemy import create_engine


def load_to_db(df, db_url):
    engine = create_engine(db_url)
    df.to_sql("videos", engine, if_exists="append", index=False)
    return
