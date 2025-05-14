from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from get_ingredients import get_ingredients

app = FastAPI()

# Allow React frontend to call this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or restrict to http://localhost:3000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ingredients")
def a():
    return get_ingredients("500")