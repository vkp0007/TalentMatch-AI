import json
import logging

from llm.client import generate_completion

from extraction.prompts import (
    JD_EXTRACTION_PROMPT
)

from utils.json_cleaner import (
    clean_json_response
)

from utils.skill_normalizer import (
    normalize_skill_name
)


# =========================================================
# LOGGER
# =========================================================

logger = logging.getLogger(__name__)


# =========================================================
# EMPTY JD PROFILE
# =========================================================

def empty_jd_profile():

    return {

        "role": "",

        "requiredSkills": [],

        "preferredSkills": [],

        "educationRequirements": {

            "required": [],

            "preferred": []
        },

        "experienceRequirements": "",

        "responsibilities": [],

        "domain": ""
     }

# =========================================================
# NORMALIZE SKILLS
# =========================================================

def normalize_skills(skills):

    normalized = set()


    if not isinstance(skills, list):
        return []


    for skill in skills:

        if skill:

            normalized.add(

                normalize_skill_name(
                    str(skill)
                )
            )


    return sorted(
        list(normalized)
    )


    # =========================================================
    # CLEAN JD PROFILE
    # =========================================================
    
def clean_jd_profile(
    jd_profile
):

    # =====================================================
    # VALIDATE PROFILE
    # =====================================================

    if not isinstance(
        jd_profile,
        dict
    ):

        return empty_jd_profile()


    # =====================================================
    # REQUIRED SKILLS
    # =====================================================

    jd_profile["requiredSkills"] = (
        normalize_skills(

            jd_profile.get(
                "requiredSkills",
                []
            )
        )
    )


    # =====================================================
    # PREFERRED SKILLS
    # =====================================================

    jd_profile["preferredSkills"] = (
        normalize_skills(

            jd_profile.get(
                "preferredSkills",
                []
            )
        )
    )


    # =====================================================
    # REMOVE SKILL OVERLAP
    # =====================================================

    jd_profile["preferredSkills"] = [

        skill

        for skill in jd_profile[
            "preferredSkills"
        ]

        if skill not in jd_profile[
            "requiredSkills"
        ]
    ]


    # =====================================================
    # EDUCATION REQUIREMENTS
    # =====================================================

    education = jd_profile.get(
        "educationRequirements",
        {}
    )


    # Ensure education is an object

    if not isinstance(
        education,
        dict
    ):

        education = {}


        # =====================================================
        # REQUIRED EDUCATION
        # =====================================================

    required_education = (
        education.get(
            "required",
                []
        )
    )


        # =====================================================
        # PREFERRED EDUCATION
        # =====================================================

    preferred_education = (
        education.get(
            "preferred",
                []
        )
    )


        # =====================================================
        # NORMALIZE REQUIRED EDUCATION
        # =====================================================

    if isinstance(
        required_education,
        str
    ):

            required_education = [
                required_education
            ]

    elif not isinstance(
        required_education,
        list
    ):

        required_education = []


            # =====================================================
            # NORMALIZE PREFERRED EDUCATION
            # =====================================================

    if isinstance(
        preferred_education,
        str
    ):

            preferred_education = [
                preferred_education
            ]

    elif not isinstance(
        preferred_education,
        list
    ):

            preferred_education = []


                # =====================================================
                # CLEAN REQUIRED EDUCATION
                # =====================================================

    required_education = [

        str(requirement).strip()

        for requirement
        in required_education

        if str(requirement).strip()
    ]


                # =====================================================
                # CLEAN PREFERRED EDUCATION
                # =====================================================

    preferred_education = [

        str(requirement).strip()

        for requirement
        in preferred_education

        if str(requirement).strip()
    ]


                # =====================================================
                # REMOVE DUPLICATE EDUCATION
                # =====================================================

    required_education = list(
        dict.fromkeys(
            required_education
        )
    )


    preferred_education = [

        requirement

        for requirement
        in dict.fromkeys(
            preferred_education
        )

        if requirement not in required_education
    ]


                # =====================================================
                # SET EDUCATION REQUIREMENTS
                # =====================================================

    jd_profile[
        "educationRequirements"
    ] = {

            "required":
                required_education,

            "preferred":
                preferred_education
    }


                        # =====================================================
                        # EXPERIENCE REQUIREMENTS
                        # =====================================================

    experience = jd_profile.get(
        "experienceRequirements",
        ""
    )


    if experience is None:

       experience = ""


    jd_profile[
        "experienceRequirements"
    ] = str(
        experience
    ).strip()


                            # =====================================================
                            # RESPONSIBILITIES
                            # =====================================================

    responsibilities = jd_profile.get(
        "responsibilities",
        []
    )


    if isinstance(
        responsibilities,
        str
    ):

        responsibilities = [
            responsibilities
        ]

    elif not isinstance(
            responsibilities,
            list
    ):

        responsibilities = []


    jd_profile[
        "responsibilities"
    ] = [

        str(responsibility).strip()

        for responsibility
        in responsibilities

        if str(responsibility).strip()
    ]


                                # =====================================================
                                # ROLE
                                # =====================================================

    role = jd_profile.get(
        "role",
        ""
    )


    if role is None:

        role = ""


    jd_profile[
        "role"
    ] = str(
        role
    ).strip()


                                    # =====================================================
                                    # DOMAIN
                                    # =====================================================

    domain = jd_profile.get(
        "domain",
        ""
    )


    if domain is None:

        domain = ""


    jd_profile[
        "domain"
    ] = str(
        domain
    ).strip()


    return jd_profile



        # =========================================================
        # EXTRACT JD DATA
        # =========================================================

def extract_jd_data(
    job_description
):

    try:

        # =================================================
        # VALIDATION
        # =================================================

        if not job_description:

            logger.warning(
                "Empty job description received."
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

        response_text = generate_completion(

            prompt=prompt,

            temperature=0.1
        )


        # =================================================
        # CLEAN RESPONSE
        # =================================================

        cleaned_text = (
            clean_json_response(
                response_text
            )
        )


        if not cleaned_text:

            logger.warning(
                "Cleaned JD JSON response is empty."
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

        return clean_jd_profile(
        parsed_json
        )


    except json.JSONDecodeError as error:

        logger.error(
            f"JD JSON parsing error: {str(error)}"
        )

        return empty_jd_profile()


    except Exception as error:

        logger.error(
        f"JD extraction error: {str(error)}"
        )

        return empty_jd_profile()