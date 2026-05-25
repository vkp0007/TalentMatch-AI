import os

import json

import re

import logging

from groq import Groq

from dotenv import load_dotenv

from extraction.prompts import (
    RESUME_EXTRACTION_PROMPT
)

from utils.skill_normalizer import (
    normalize_skill_name
)


# =========================================================
# ENV
# =========================================================

load_dotenv()


# =========================================================
# LOGGER
# =========================================================

logging.basicConfig(
    level=logging.INFO
)

logger = logging.getLogger(__name__)


# =========================================================
# GROQ CLIENT
# =========================================================

client = Groq(

    api_key=os.getenv(
        "GROQ_API_KEY"
    )
)


MODEL_NAME = (
    "llama-3.3-70b-versatile"
)



# =========================================================
# CLEAN JSON RESPONSE
# =========================================================

def clean_json_response(text):

    text = text.strip()


    # remove markdown blocks
    text = re.sub(

        r"```json|```",

        "",

        text
    )


    # remove trailing commas
    text = re.sub(

        r",\s*}",

        "}",

        text
    )

    text = re.sub(

        r",\s*]",

        "]",

        text
    )


    return text.strip()



# =========================================================
# NORMALIZE SKILLS
# =========================================================

def normalize_skills(skills):

    normalized = set()


    for skill in skills:

        if skill:

            normalized.add(

                normalize_skill_name(
                    skill
                )
            )


    return sorted(
        list(normalized)
    )



# =========================================================
# CLEAN RESUME DATA
# =========================================================

def clean_resume_data(data):

    # =====================================================
    # TECHNICAL SKILLS
    # =====================================================

    data["technicalSkills"] = (
        normalize_skills(

            data.get(
                "technicalSkills",
                []
            )
        )
    )


    # =====================================================
    # TOOLS
    # =====================================================

    data["tools"] = (
        normalize_skills(

            data.get(
                "tools",
                []
            )
        )
    )


    # =====================================================
    # PROJECT TECHNOLOGIES
    # =====================================================

    projects = data.get(
        "projects",
        []
    )


    cleaned_projects = []


    for project in projects:

        project["technologies"] = (
            normalize_skills(

                project.get(
                    "technologies",
                    []
                )
            )
        )

        cleaned_projects.append(
            project
        )


    data["projects"] = (
        cleaned_projects
    )


    return data



# =========================================================
# EMPTY FALLBACK
# =========================================================

def empty_resume_response():

    return {

        "candidateInfo": {

            "name": "",

            "email": "",

            "phone": "",

            "linkedin": "",

            "github": ""
        },

        "technicalSkills": [],

        "tools": [],

        "experience": [],

        "projects": [],

        "education": [],

        "certifications": [],

        "candidateSummary": ""
    }



# =========================================================
# EXTRACT STRUCTURED RESUME DATA
# =========================================================

def extract_resume_data(
    resume_text
):

    try:

        # =================================================
        # VALIDATION
        # =================================================

        if not resume_text:

            logger.warning(
                "Empty resume text received"
            )

            return empty_resume_response()


        # =================================================
        # TOKEN SAFETY
        # =================================================

        resume_text = (
            resume_text[:12000]
        )


        # =================================================
        # PROMPT
        # =================================================

        prompt = (

            RESUME_EXTRACTION_PROMPT

            +

            "\n\n"

            +

            resume_text
        )


        # =================================================
        # LLM CALL
        # =================================================

        completion = (

            client.chat.completions.create(

                model=MODEL_NAME,

                messages=[

                    {
                        "role": "user",

                        "content": prompt
                    }
                ],

                temperature=0.1
            )
        )


        # =================================================
        # RESPONSE
        # =================================================

        response_text = (

            completion.choices[0]
            .message.content
        )


        if not response_text:

            logger.warning(
                "Empty LLM response"
            )

            return empty_resume_response()


        # =================================================
        # CLEAN JSON
        # =================================================

        cleaned_text = (
            clean_json_response(
                response_text
            )
        )


        if not cleaned_text:

            logger.warning(
                "Cleaned JSON response empty"
            )

            return empty_resume_response()


        # =================================================
        # PARSE JSON
        # =================================================

        parsed_json = json.loads(
            cleaned_text
        )


        # =================================================
        # CLEAN DATA
        # =================================================

        parsed_json = (
            clean_resume_data(
                parsed_json
            )
        )


        return parsed_json


    except json.JSONDecodeError as error:

        logger.error(

            f"JSON Parsing Error: {str(error)}"
        )

        return empty_resume_response()


    except Exception as error:

        logger.error(

            f"Resume Extraction Error: {str(error)}"
        )

        return empty_resume_response()