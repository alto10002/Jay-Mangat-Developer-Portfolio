import pandas as pd
from pathlib import Path
import numpy as np

def generate(chosen_ingredients):
    path = Path(__file__).resolve().parents[2] / 'data' / 'raw_recipes.csv'
    df = pd.read_csv(path)
    df = df.replace([np.inf, -np.inf, np.nan], None)

    df1 = df[
        df["ingredients"].apply(
            lambda lst: all(ingredient in lst for ingredient in chosen_ingredients)
        )
    ]
    return df1.to_dict(orient="records")
    
# Test
# print(generate(['oil','cheese'])[0])