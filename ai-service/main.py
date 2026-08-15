from fastapi import FastAPI

from fastapi.middleware.cors import (
    CORSMiddleware
)

from routes.ai_routes import router


app = FastAPI()


# cors
app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)


app.include_router(
    router,
    prefix="/api/ai"
)


@app.get("/")
def health_check():

    return {
        "status": "ok",
        "service": "TalentMatch AI Service"
    }