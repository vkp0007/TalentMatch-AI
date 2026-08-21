import json
import logging
import re

from llm.client import generate_completion

from extraction.prompts import RESUME_EXTRACTION_PROMPT

from utils.json_cleaner import clean_json_response

from utils.skill_normalizer import normalize_skill_name


logger = logging.getLogger(__name__)


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

    return sorted(normalized)


        # =========================================================
        # CLEAN CONTACT VALUE
        # =========================================================

def clean_contact_value(value):

    if not value:
        return ""

    value = str(value).strip()

    email_match = re.search(
        r'[\w.+-]+@[\w.-]+\.\w+',
        value
    )

    if email_match:

        return email_match.group(0)

    return value


    # =========================================================
    # CLEAN RESUME DATA
    # =========================================================

def clean_resume_data(data):

    if not isinstance(data, dict):

        return empty_resume_response()


    # =====================================================
    # CANDIDATE INFORMATION
    # =====================================================

    candidate_info = data.get(
        "candidateInfo",
        {}
    )

    if not isinstance(
        candidate_info,
        dict
    ):

        candidate_info = {}


    candidate_info["name"] = str(
        candidate_info.get(
                "name",
                ""
        ) or ""
    ).strip()


    candidate_info["email"] = (
        clean_contact_value(
            candidate_info.get(
                    "email",
                    ""
            )
        )
    )


    candidate_info["phone"] = str(
        candidate_info.get(
                "phone",
                ""
        ) or ""
    ).strip()


    candidate_info["linkedin"] = str(
        candidate_info.get(
                "linkedin",
                ""
        ) or ""
    ).strip()


    candidate_info["github"] = str(
        candidate_info.get(
                "github",
                ""
        ) or ""
    ).strip()


    data["candidateInfo"] = candidate_info


        # =====================================================
        # TECHNICAL SKILLS
        # =====================================================

    data["technicalSkills"] = normalize_skills(
        data.get(
                "technicalSkills",
                []
        )
    )


        # =====================================================
        # TOOLS
        # =====================================================

    data["tools"] = normalize_skills(
        data.get(
                "tools",
                []
        )
    )


        # =====================================================
        # PROJECTS
        # =====================================================

    projects = data.get(
            "projects",
            []
    )

    if not isinstance(
            projects,
            list
    ):

        projects = []


    cleaned_projects = []


    for project in projects:

        if not isinstance(
            project,
            dict
        ):

            continue


        project["name"] = str(
            project.get(
                        "name",
                        ""
            ) or ""
        ).strip()


        project["description"] = str(
            project.get(
                        "description",
                        ""
            ) or ""
        ).strip()


        project["technologies"] = normalize_skills(
            project.get(
                        "technologies",
                        []
            )
        )


        responsibilities = project.get(
                    "responsibilities",
                    []
        )


        if not isinstance(
            responsibilities,
            list
        ):

            responsibilities = []


            project["responsibilities"] = [

                str(item).strip()

                for item in responsibilities

                if item
            ]


            cleaned_projects.append(
                project
            )


        data["projects"] = cleaned_projects


                    # =====================================================
                    # ARRAY FIELDS
                    # =====================================================

        for field in [

            "experience",
            "education",
            "certifications",
            "training",
            "achievements"

        ]:

            if not isinstance(
                data.get(field),
                list
            ):

                data[field] = []


                            # =====================================================
                            # SUMMARY
                            # =====================================================

        if not isinstance(
                data.get(
                    "candidateSummary"
                ),
                str
        ):

                data["candidateSummary"] = ""


                data["candidateSummary"] = (
                    data["candidateSummary"]
                    .strip()
                )


                return data


                            # =========================================================
                            # EMPTY RESPONSE
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

        "training": [],

        "achievements": [],

        "candidateSummary": ""
    }


# =========================================================
# EXTRACT RESUME DATA
# =========================================================

def extract_resume_data(
    resume_text
):

    try:

        if not resume_text:

            logger.warning(
                "Empty resume text received."
            )

            return empty_resume_response()


        # -------------------------------------------------
        # Limit input size
        # -------------------------------------------------

        resume_text = resume_text[:12000]


        # -------------------------------------------------
        # Build prompt
        # -------------------------------------------------

        prompt = (

            RESUME_EXTRACTION_PROMPT

            + "\n\n"

            + resume_text

        )


        # -------------------------------------------------
        # Call Groq
        # -------------------------------------------------

        response_text = generate_completion(

            prompt=prompt,

            temperature=0.1
        )


        if not response_text:

            logger.warning(
                "LLM returned an empty response."
            )

            return empty_resume_response()


        # -------------------------------------------------
        # DEBUG RESPONSE
        # -------------------------------------------------

        logger.info(
            "LLM response length: %s",
            len(response_text)
        )

        logger.info(
            "LLM response ending: %s",
            response_text[-500:]
        )


        # -------------------------------------------------
        # Clean JSON
        # -------------------------------------------------

        cleaned_text = clean_json_response(
            response_text
        )


        if not cleaned_text:

            logger.warning(
                "Cleaned resume JSON response is empty."
            )

            return empty_resume_response()


        # -------------------------------------------------
        # Parse JSON
        # -------------------------------------------------

        try:

            parsed_json = json.loads(
                cleaned_text
            )

        except json.JSONDecodeError as error:

            logger.error(
                "Resume JSON parsing error: %s",
                error
            )

            logger.error(
                "Malformed JSON length: %s",
                len(cleaned_text)
            )

            logger.error(
                "Malformed JSON ending: %s",
                cleaned_text[-1000:]
            )

            return empty_resume_response()


        # -------------------------------------------------
        # Validate object
        # -------------------------------------------------

        if not isinstance(
            parsed_json,
            dict
        ):

            logger.error(
                "LLM returned JSON but it is not an object."
            )

            return empty_resume_response()


        # -------------------------------------------------
        # Clean extracted data
        # -------------------------------------------------

        cleaned_data = clean_resume_data(
            parsed_json
        )


        logger.info(
            "Resume extraction successful."
        )


        logger.info(
            "Skills extracted: %s",
            len(
                cleaned_data.get(
                    "technicalSkills",
                    []
                )
            )
        )


        logger.info(
            "Projects extracted: %s",
            len(
                cleaned_data.get(
                    "projects",
                    []
                )
            )
        )


        logger.info(
            "Experience entries: %s",
            len(
                cleaned_data.get(
                    "experience",
                    []
                )
            )
        )


        return cleaned_data


    except Exception as error:

        logger.exception(
            "Resume extraction error: %s",
            error
        )

        return empty_resume_response()