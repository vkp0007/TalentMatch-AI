import logging

from models.embedding_model import (
    get_embedding_model
)

from sklearn.metrics.pairwise import (
    cosine_similarity
)

from utils.skill_aliases import (
    SKILL_ALIASES
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
# EXPAND SKILLS USING ALIASES
# =========================================================

def expand_candidate_skills(skills):

    expanded_skills = set()


    for skill in skills:

        normalized_skill = (
            normalize_skill_name(
                skill
            )
        )


        expanded_skills.add(
            normalized_skill
        )


        # alias expansion
        if normalized_skill in SKILL_ALIASES:

            for alias_skill in SKILL_ALIASES[
                normalized_skill
            ]:

                expanded_skills.add(

                    normalize_skill_name(
                        alias_skill
                    )
                )


    return sorted(
        list(expanded_skills)
    )



# =========================================================
# EXTRACT ALL CANDIDATE SKILLS
# =========================================================

def extract_candidate_skills(
    candidate_profile
):

    skills = set()


    # =====================================================
    # TECHNICAL SKILLS
    # =====================================================

    for skill in candidate_profile.get(
        "technicalSkills",
        []
    ):

        skills.add(

            normalize_skill_name(
                skill
            )
        )


    # =====================================================
    # TOOLS
    # =====================================================

    for tool in candidate_profile.get(
        "tools",
        []
    ):

        skills.add(

            normalize_skill_name(
                tool
            )
        )


    # =====================================================
    # PROJECT TECHNOLOGIES
    # =====================================================

    for project in candidate_profile.get(
        "projects",
        []
    ):

        for tech in project.get(
            "technologies",
            []
        ):

            skills.add(

                normalize_skill_name(
                    tech
                )
            )


    # =====================================================
    # EXPAND SKILLS
    # =====================================================

    expanded_skills = (
        expand_candidate_skills(
            list(skills)
        )
    )


    return expanded_skills



# =========================================================
# SKILL MATCHING
# =========================================================

def compare_skills(

    candidate_profile,

    jd_profile,

    threshold=0.55
):

    # =====================================================
    # CANDIDATE SKILLS
    # =====================================================

    candidate_skills = (
        extract_candidate_skills(
            candidate_profile
        )
    )


    # =====================================================
    # JD SKILLS
    # =====================================================

    required_skills = (
        normalize_skills(

            jd_profile.get(
                "requiredSkills",
                []
            )
        )
    )


    preferred_skills = (
        normalize_skills(

            jd_profile.get(
                "preferredSkills",
                []
            )
        )
    )


    # =====================================================
    # COMBINE JD SKILLS
    # =====================================================

    all_jd_skills = sorted(

        list(

            set(

                required_skills +

                preferred_skills
            )
        )
    )


    matched_skills = []

    missing_skills = []

    additional_skills = []


    # =====================================================
    # EMPTY HANDLING
    # =====================================================

    if not candidate_skills:

        logger.warning(
            "No candidate skills found"
        )

        return {

            "matchedSkills": [],

            "missingSkills":
                all_jd_skills,

            "additionalSkills": [],

            "skillScore": 0
        }


    if not all_jd_skills:

        logger.warning(
            "No JD skills found"
        )

        return {

            "matchedSkills": [],

            "missingSkills": [],

            "additionalSkills":
                candidate_skills,

            "skillScore": 0
        }


    # =====================================================
    # DIRECT MATCHES
    # =====================================================

    direct_matches = set(
        candidate_skills
    ).intersection(
        set(all_jd_skills)
    )


    matched_skills.extend(
        list(direct_matches)
    )


    remaining_jd_skills = [

        skill

        for skill in all_jd_skills

        if skill not in direct_matches
    ]


    # =====================================================
    # EMBEDDINGS
    # =====================================================
        # =====================================================
    # EMBEDDINGS
    # =====================================================

    try:

        model = (
            get_embedding_model()
        )

        candidate_embeddings = (
            model.encode(
                candidate_skills
            )
        )

        jd_embeddings = (
            model.encode(
                remaining_jd_skills
            )
        )

    except Exception as error:

        logger.error(

            f"Skill Embedding Error: {str(error)}"
        )

        return {

            "matchedSkills":
                matched_skills,

            "missingSkills":
                remaining_jd_skills,

            "additionalSkills":
                candidate_skills,

            "skillScore": 0
        }


    matched_candidate_skills = set()

    # =====================================================
    # SEMANTIC MATCHING
    # =====================================================

    for jd_index, jd_skill in enumerate(
        remaining_jd_skills
    ):

        best_similarity = 0

        best_candidate_skill = None


        for candidate_index, candidate_skill in enumerate(
            candidate_skills
        ):

            similarity = (
                cosine_similarity(

                    [jd_embeddings[jd_index]],

                    [candidate_embeddings[candidate_index]]

                )[0][0]
            )


            if similarity > best_similarity:

                best_similarity = similarity

                best_candidate_skill = (
                    candidate_skill
                )


        # =================================================
        # THRESHOLD MATCHING
        # =================================================

        if best_similarity >= threshold:

            matched_skills.append(
                jd_skill
            )

            matched_candidate_skills.add(
                best_candidate_skill
            )

        else:

            missing_skills.append(
                jd_skill
            )


    # =====================================================
    # ADDITIONAL SKILLS
    # =====================================================

    for skill in candidate_skills:

        if (

            skill not in matched_candidate_skills

            and

            skill not in matched_skills
        ):

            additional_skills.append(
                skill
            )


    # =====================================================
    # REMOVE DUPLICATES
    # =====================================================

    matched_skills = sorted(
        list(set(matched_skills))
    )

    missing_skills = sorted(
        list(set(missing_skills))
    )

    additional_skills = sorted(
        list(set(additional_skills))
    )


    # =====================================================
    # SCORE CALCULATION
    # =====================================================

    total_jd_skills = len(
        all_jd_skills
    )


    skill_score = round(

        (
            len(matched_skills)

            /

            total_jd_skills

        ) * 100,

        2
    )


    return {

        "matchedSkills":
            matched_skills,

        "missingSkills":
            missing_skills,

        "additionalSkills":
            additional_skills,

        "skillScore":
            skill_score
    }