import pandas as pd
import isodate
import ast


def transform(dataframe):
    category_ids = {
        "1": "Film & Animation",
        "2": "Autos & Vehicles",
        "10": "Music",
        "15": "Pets & Animals",
        "17": "Sports",
        "18": "Short Movies",
        "19": "Travel & Events",
        "20": "Gaming",
        "21": "Videoblogging",
        "22": "People & Blogs",
        "23": "Comedy",
        "24": "Entertainment",
        "25": "News & Politics",
        "26": "Howto & Style",
        "27": "Education",
        "28": "Science & Technology",
        "30": "Movies",
        "31": "Anime/Animation",
        "32": "Action/Adventure",
        "33": "Classics",
        "34": "Comedy",
        "35": "Documentary",
        "36": "Drama",
        "37": "Family",
        "38": "Foreign",
        "39": "Horror",
        "40": "Sci-Fi/Fantasy",
        "41": "Thriller",
        "42": "Shorts",
        "43": "Shows",
        "44": "Trailers",
    }
    dataframe["publish_date"] = pd.to_datetime(
        dataframe["publish_date"], errors="coerce"
    )
    dataframe["duration"] = dataframe["duration"].apply(isodate.parse_duration)
    dataframe["tags"] = dataframe["tags"].apply(lambda s: list(ast.literal_eval(s)))
    dataframe["tag_count"] = dataframe["tags"].apply(len)
    dataframe["categoryID"] = dataframe["categoryID"].apply(str)
    dataframe["category_name"] = dataframe["categoryID"].map(category_ids)
    return dataframe


extract_df = pd.read_csv("extract.csv")
transform_df = transform(extract_df)
transform_df.to_csv("transform.csv", index=False)
