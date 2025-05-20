import pandas as pd
from pathlib import Path
import numpy as np
import random

def generate(chosen_ingredients):
    path = Path(__file__).resolve().parents[2] / 'data' / 'cleaned_recipes.csv'
    df = pd.read_csv(path)
    df = df.replace([np.inf, -np.inf, np.nan], None)

    df1 = df[
        df["ingredients"].apply(
            lambda lst: all(ingredient in lst for ingredient in chosen_ingredients)
        )
    ]
    
    chosen_recipes = df1.sample(3)
    chosen_recipes['ingredients'] = chosen_recipes['ingredients'].apply(
        lambda s: [i.capitalize() for i in eval(s)]
    )
    chosen_recipes['steps'] = chosen_recipes['steps'].apply(
        lambda s: [step.capitalize() for step in eval(s)]
    )
    # convert to dicts
    return chosen_recipes.to_dict(orient="records")
    
    
# Test
print(generate(['oil','cheese']))