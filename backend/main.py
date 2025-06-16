from fastapi import FastAPI
from fastapi import Body
from fastapi.middleware.cors import CORSMiddleware
from backend.app.services.get_ingredients import get_ingredients
from backend.app.services.generate import generate
from backend.app.services.quick_ingredient_count_update import ingredient_count
from backend.app.services.process_filters import process_filters
from pydantic import BaseModel
from typing import List

app = FastAPI()

origins = ["https://jay-mangat.vercel.app", "http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/ingredients")
def fetch_ingredients():
    return get_ingredients("50")


class FilterPayload(BaseModel):
    categories: list[str]
    countries: list[str]
    startDate: str
    endDate: str


@app.post("/youtube_filter")
def process_and_filter(filters: FilterPayload):
    data = process_filters(filters)
    return {"data": data}


class IngredientsRequest(BaseModel):
    user_ingredients: List[str]


@app.post("/generate_recipes")
def fetch_recipes(data: IngredientsRequest):
    try:
        return generate(data.user_ingredients)
    except Exception as e:
        print(f"Error in /generate_recipes: {e}")
        raise


@app.post("/quick_ingredient_count_update")
def fetch_recipes(data: IngredientsRequest):
    return ingredient_count(data.user_ingredients)
