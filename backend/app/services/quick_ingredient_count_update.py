import pandas as pd
from pathlib import Path

def ingredient_count(ingredients):
    path = Path(__file__).parent.parent.parent / 'data' / 'new_quick_ingredient_count_dataset.csv'
    
    df = pd.read_csv(path)
    
    matches = df[df['ingredients'].apply(lambda ing: all(val in ing for val in ingredients))]
    return matches['id'].tolist()
    
# print(ingredient_count(['salt','butter']))