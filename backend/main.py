from fastapi import FastAPI
from fastapi import Body
from fastapi.middleware.cors import CORSMiddleware
from backend.app.services.get_ingredients import get_ingredients
from backend.app.services.generate import generate
from backend.app.services.quick_ingredient_count_update import ingredient_count
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ingredients")
def fetch_ingredients():
    return get_ingredients('50')

class IngredientsRequest(BaseModel):
    user_ingredients: List[str]

@app.post("/generate_recipes")
def fetch_recipes(data: IngredientsRequest):
    return generate(data.user_ingredients)

@app.post("/quick_ingredient_count_update")
def fetch_recipes(data: IngredientsRequest):
    return ingredient_count(data.user_ingredients)