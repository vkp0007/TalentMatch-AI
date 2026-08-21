from fastapi import FastAPI

from fastapi.middleware.cors import (
    CORSMiddleware
)

from routes.ai_routes import router


app = FastAPI()


# =========================================================
# CORS
# =========================================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)


# =========================================================
# AI ROUTES
# =========================================================

app.include_router(
    router,
    prefix="/api/ai"
)


# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/")
def health_check():

    return {
        "status": "ok",
        "service": "TalentMatch AI Service"
    }