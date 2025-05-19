from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.services.get_ingredients import get_ingredients
from backend.app.services.generate import generate
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
    result = generate(data.user_ingredients)
    return result