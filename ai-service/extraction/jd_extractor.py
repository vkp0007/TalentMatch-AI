import json

import re

import logging

from extraction.prompts import (
    JD_EXTRACTION_PROMPT
)

from extraction.llm_extractor import (

    client,

    MODEL_NAME
)

from utils.skill_normalizer import (
    normalize_skill_name
)


# =========================================================
# LOGGER
# =========================================================

logging.basicConfig(
    level=logging.INFO
)

logger = logging.getLogger(__name__)



# =========================================================
# EMPTY JD PROFILE
# =========================================================

def empty_jd_profile():

    return {

        "role": "",

        "requiredSkills": [],

        "preferredSkills": [],

        "experienceRequirements": "",

        "responsibilities": [],

        "domain": ""
    }



# =========================================================
# CLEAN JSON RESPONSE
# =========================================================

def clean_json_response(text):

    text = text.strip()


    # remove markdown
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
# CLEAN JD PROFILE
# =========================================================

def clean_jd_profile(jd_profile):

    jd_profile["requiredSkills"] = (
        normalize_skills(

            jd_profile.get(
                "requiredSkills",
                []
            )
        )
    )


    jd_profile["preferredSkills"] = (
        normalize_skills(

            jd_profile.get(
                "preferredSkills",
                []
            )
        )
    )


    # remove overlap
    jd_profile["preferredSkills"] = [

        skill

        for skill in jd_profile[
            "preferredSkills"
        ]

        if skill not in jd_profile[
            "requiredSkills"
        ]
    ]


    return jd_profile



# =========================================================
# EXTRACT JD DATA
# =========================================================

def extract_jd_data(job_description):

    try:

        # =================================================
        # VALIDATION
        # =================================================

        if not job_description:

            logger.warning(
                "Empty job description received"
            )

            return empty_jd_profile()


        # =================================================
        # TOKEN SAFETY
        # =================================================

        job_description = (
            job_description[:12000]
        )


        # =================================================
        # PROMPT
        # =================================================

        prompt = (

            JD_EXTRACTION_PROMPT

            +

            "\n\n"

            +

            job_description
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
                "Empty LLM JD extraction response"
            )

            return empty_jd_profile()


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
                "Cleaned JD JSON response empty"
            )

            return empty_jd_profile()


        # =================================================
        # PARSE JSON
        # =================================================

        parsed_json = json.loads(
            cleaned_text
        )


        # =================================================
        # CLEAN PROFILE
        # =================================================

        parsed_json = (
            clean_jd_profile(
                parsed_json
            )
        )


        return parsed_json


    except json.JSONDecodeError as error:

        logger.error(

            f"JD JSON Parsing Error: {str(error)}"
        )

        return empty_jd_profile()


    except Exception as error:

        logger.error(

            f"JD Extraction Error: {str(error)}"
        )

        return empty_jd_profile()