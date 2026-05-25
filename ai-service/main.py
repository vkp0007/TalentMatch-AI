from fastapi import FastAPI

from fastapi.middleware.cors import (
    CORSMiddleware
)

from ai_routes import (
    router as ai_router
)


app = FastAPI()


# cors
app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)


# routes
app.include_router(ai_router)


@app.get("/")
def home():

    return {

        "message":
        "AI Service Running"
    }