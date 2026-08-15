import logging
import re


# =========================================================
# LOGGER
# =========================================================

logger = logging.getLogger(__name__)


# =========================================================
# DEFAULT RESULT
# =========================================================

def empty_eligibility_result():

    return {

        "educationMatch": True,

        "experienceMatch": True,

        "eligibilityWarnings": []
    }


# =========================================================
# NORMALIZE TEXT
# =========================================================

def normalize_text(text):

    if not text:

        return ""

    return str(text).lower().strip()



# =========================================================
# EXPERIENCE YEARS
# =========================================================

def extract_years(text):

    if not text:

        return None

    text = normalize_text(text)



    matches = re.findall(
            r"(\d+(?:\.\d+)?)\s*(?:\+)?\s*(?:years?|yrs?)",
            text
    )

    if not matches:

        return None

    try:

        return max(
            float(value)
            for value in matches
        )

    except (ValueError, TypeError):

            return None


        # =========================================================
        # CANDIDATE EXPERIENCE
        # =========================================================

def get_candidate_experience(
    resume_data
):

    experience = resume_data.get(
        "experience",
        []
    )

    if not isinstance(
        experience,
        list
    ):

        return 0


    total_years = 0


    for item in experience:

        if not isinstance(
            item,
            dict
        ):

            continue


        # Look for explicit duration

        duration = (
            item.get(
                "duration",
                ""
            )
        )


        years = extract_years(
            duration
        )


        if years is not None:

            total_years += years


    return total_years


        # =========================================================
        # EDUCATION TEXT
        # =========================================================

def get_candidate_education(
    resume_data
):

    education = resume_data.get(
        "education",
        []
    )

    if not isinstance(
        education,
        list
    ):

        return []


    education_text = []


    for item in education:

        if not isinstance(
            item,
            dict
        ):

            continue


        degree = normalize_text(
            item.get(
                "degree",
                ""
            )
        )


        institution = normalize_text(
            item.get(
                "institution",
                ""
            )
        )


        if degree:

            education_text.append(
                degree
            )


        if institution:

            education_text.append(
                institution
            )


    return education_text


            # =========================================================
            # EDUCATION MATCHING
            # =========================================================

def check_education(
    resume_data,
    education_requirements
):

    if not isinstance(
        education_requirements,
        dict
    ):

        return True


    required = education_requirements.get(
        "required",
        []
    )


    preferred = education_requirements.get(
        "preferred",
        []
    )


    if not required and not preferred:

        return True


    candidate_education = get_candidate_education(
        resume_data
    )


    candidate_text = " ".join(
        candidate_education
    )


    # -----------------------------------------------------
    # No candidate education information
    # -----------------------------------------------------

    if not candidate_text:

        if required:

            return False

        return True


        # -----------------------------------------------------
        # Required education
        # -----------------------------------------------------

    for requirement in required:

        requirement_text = normalize_text(
            requirement
        )


            # Basic keyword-based comparison
            # This will be improved with semantic matching later.

        keywords = re.findall(
            r"[a-zA-Z]+",
            requirement_text
        )


        meaningful_keywords = [

            word

            for word in keywords

            if len(word) > 2

            and word not in {

                "degree",
                "field",
                "related"
            }
        ]


        if not meaningful_keywords:

            continue


        matched = any(

            keyword in candidate_text

            for keyword
            in meaningful_keywords
        )


        if not matched:

            return False


    return True


            # =========================================================
            # EXPERIENCE MATCHING
            # =========================================================

def check_experience(
    resume_data,
    experience_requirement
):

    if not experience_requirement:

        return True


    required_years = extract_years(
        experience_requirement
    )


    # -----------------------------------------------------
    # Cannot determine requirement
    # -----------------------------------------------------

    if required_years is None:

        logger.info(
            "Could not determine required experience."
        )

        return True


    candidate_years = get_candidate_experience(
        resume_data
    )


    return (
    candidate_years >= required_years
    )


# =========================================================
# MAIN ELIGIBILITY CHECK
# =========================================================

def check_eligibility(
    resume_data,
    jd_profile
):

    result = (
        empty_eligibility_result()
    )


    try:

        # -------------------------------------------------
        # Validation
        # -------------------------------------------------

        if not isinstance(
            resume_data,
            dict
        ):

            return result


        if not isinstance(
            jd_profile,
            dict
        ):

            return result


        # -------------------------------------------------
        # EDUCATION
        # -------------------------------------------------

        education_requirements = (
            jd_profile.get(
                "educationRequirements",
                {}
            )
        )


        education_match = check_education(

            resume_data,

            education_requirements
        )


        result[
            "educationMatch"
        ] = education_match


        # -------------------------------------------------
        # EXPERIENCE
        # -------------------------------------------------

        experience_requirement = (
            jd_profile.get(
                "experienceRequirements",
                ""
            )
        )


        experience_match = check_experience(

            resume_data,

            experience_requirement
        )


        result[
            "experienceMatch"
        ] = experience_match


        # -------------------------------------------------
        # WARNINGS
        # -------------------------------------------------

        warnings = []


        if not education_match:

            warnings.append(
                "Education requirements may not be satisfied."
            )


        if not experience_match:

            warnings.append(
                "Experience requirements may not be satisfied."
            )


        result[
                "eligibilityWarnings"
            ] = warnings


        return result


    except Exception as error:

        logger.error(
            f"Eligibility matching error: {str(error)}"
        )

        return result