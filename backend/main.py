from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.services.get_ingredients import get_ingredients
from backend.app.services.generate import generate_recipes, google_links_wrapper
from backend.app.services.process_filters import process_filters
from pydantic import BaseModel
from typing import List

import psutil, os, time, threading
from fastapi import FastAPI


def log_memory():
    process = psutil.Process(os.getpid())
    while True:
        mem = process.memory_info().rss / (1024 * 1024)  # MB
        print(f"[MEMORY] {mem:.2f} MB")
        time.sleep(5)  # adjust interval if needed


# start memory logger thread
threading.Thread(target=log_memory, daemon=True).start()


app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/ping")
async def ping():
    return {"message": "pong"}


@app.get("/ingredients")
def fetch_ingredients():
    return get_ingredients()


class FilterPayload(BaseModel):
    categories: list[str]
    countries: list[str]
    startDate: str
    endDate: str


@app.post("/youtube_filter")
def process_and_filter(filters: FilterPayload):
    data = process_filters(filters)
    for row in data:
        row["upload_date"] = row["upload_date"].strftime("%Y-%m-%d")
        row["trending_date"] = row["trending_date"].strftime("%Y-%m-%d")
    return {"data": data}


class IngredientsRequest(BaseModel):
    user_ingredients: List[str]


@app.post("/filter_recipes")
def filter_recipes(data: IngredientsRequest):
    return generate_recipes(data.user_ingredients)


class IDRequest(BaseModel):
    ids: List[int]


@app.post("/add_links")
def add_links():
    return google_links_wrapper()
