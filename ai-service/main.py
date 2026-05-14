from fastapi import FastAPI
from pydantic import BaseModel

from parser.resume_parser import extract_text
from parser.nlp_skill_extractor import extract_skills_nlp

app = FastAPI()


class ResumeRequest(BaseModel):
    filePath: str


@app.get("/")
def home():

    return {
        "message": "TalentMatch AI Service Running"
    }


@app.post("/extract-text")
def extract_resume_text(data: ResumeRequest):

    try:

        text = extract_text(data.filePath)

        return {
            "success": True,
            "extractedText": text
        }

    except Exception as error:

        return {
            "success": False,
            "error": str(error)
        }
    
@app.post("/extract-skills")
def extract_resume_skills(data: ResumeRequest):

    try:

        text = extract_text(data.filePath)

        skills = extract_skills_nlp(text)

        return {
            "success": True,
            "skills": skills
        }

    except Exception as error:

        return {
            "success": False,
            "error": str(error)
        }