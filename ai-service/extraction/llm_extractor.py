import json
import logging
import re

from llm.client import generate_completion

from extraction.prompts import RESUME_EXTRACTION_PROMPT

from utils.json_cleaner import clean_json_response

from utils.skill_normalizer import normalize_skill_name


logger = logging.getLogger(__name__)


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


def clean_contact_value(value):

    if not value:
        return ""

    value = str(value).strip()

    # Extract plain email from Markdown/mailto format
    email_match = re.search(
        r'[\w.+-]+@[\w.-]+\.\w+',
        value
    )

    if email_match:
        return email_match.group(0)

    return value


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

    if not isinstance(candidate_info, dict):
        candidate_info = {}


    email = str(
        candidate_info.get(
            "email",
            ""
        )
    )

    email_match = re.search(
        r'[\w.+-]+@[\w.-]+\.\w+',
        email
    )

    candidate_info["email"] = (
        email_match.group(0)
        if email_match
        else ""
    )


    data["candidateInfo"] = candidate_info
        # =====================================================
        # TECHNICAL SKILLS
        # =====================================================

    data["technicalSkills"] = normalize_skills(
        data.get("technicalSkills", [])
    )

        # =====================================================
        # TOOLS
        # =====================================================

    data["tools"] = normalize_skills(
        data.get("tools", [])
    )

        # =====================================================
        # PROJECTS
        # =====================================================

    projects = data.get(
        "projects",
        []
    )

    if not isinstance(projects, list):
        projects = []

    cleaned_projects = []

    for project in projects:

        if not isinstance(project, dict):
            continue

        project["technologies"] = normalize_skills(
            project.get("technologies", [])
        )

        cleaned_projects.append(project)

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

            if not isinstance(data.get(field), list):
                data[field] = []

                        # =====================================================
                        # SUMMARY
                        # =====================================================

    if not isinstance(
        data.get("candidateSummary"),
        str
    ):
        data["candidateSummary"] = ""

    return data


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


def extract_resume_data(resume_text):

    try:

        if not resume_text:

            logger.warning(
                "Empty resume text received."
            )

            return empty_resume_response()

        resume_text = resume_text[:12000]

        prompt = (
            RESUME_EXTRACTION_PROMPT
            + "\n\n"
            + resume_text
        )

        response_text = generate_completion(
            prompt=prompt,
            temperature=0.1
        )

        cleaned_text = clean_json_response(
            response_text
        )

        if not cleaned_text:

            logger.warning(
                "Cleaned resume JSON response is empty."
            )

            return empty_resume_response()

        parsed_json = json.loads(
            cleaned_text
        )

        return clean_resume_data(
        parsed_json
        )

    except json.JSONDecodeError as error:

        logger.error(
            f"Resume JSON parsing error: {str(error)}"
        )

        return empty_resume_response()

    except Exception as error:

        logger.error(
        f"Resume extraction error: {str(error)}"
        )

        return empty_resume_response()