import logging

import numpy as np

from sklearn.metrics.pairwise import cosine_similarity

from models.embedding_model import get_embedding_model


logging.basicConfig(
    level=logging.INFO
)

logger = logging.getLogger(__name__)


# =========================================================
# CLEAN TEXT
# =========================================================

def clean_text(text):

    if not text:
        return ""

    return (
        str(text)
        .replace("\n", " ")
        .replace("\t", " ")
        .strip()
    )


# =========================================================
# BUILD JD SEMANTIC TEXT
# =========================================================

def build_jd_semantic_text(jd_profile):

    if not isinstance(jd_profile, dict):
        return ""

    parts = []


    # =====================================================
    # ROLE
    # =====================================================

    role = jd_profile.get(
        "role",
        ""
    )

    if role:

        parts.append(
            f"Role: {role}"
        )


        # =====================================================
        # REQUIRED SKILLS
        # =====================================================

    required_skills = jd_profile.get(
        "requiredSkills",
        []
    )

    if required_skills:

        parts.append(
            "Required skills: "
            + ", ".join(
                str(skill)
                for skill in required_skills
                if skill
            )
        )


            # =====================================================
            # PREFERRED SKILLS
            # =====================================================

    preferred_skills = jd_profile.get(
        "preferredSkills",
        []
    )

    if preferred_skills:

        parts.append(
            "Preferred skills: "
            + ", ".join(
                str(skill)
                for skill in preferred_skills
                if skill
            )
        )


                # =====================================================
                # RESPONSIBILITIES
                # =====================================================

    responsibilities = jd_profile.get(
        "responsibilities",
        []
    )

    if responsibilities:

        parts.append(
            "Responsibilities: "
            + ". ".join(
                str(item)
                for item in responsibilities
                if item
            )
        )


                    # =====================================================
                    # DOMAIN
                    # =====================================================

    domain = jd_profile.get(
        "domain",
        ""
    )

    if domain:

        parts.append(
            f"Domain: {domain}"
        )


        return "\n".join(parts)


                    # =========================================================
                    # CALCULATE SEMANTIC SIMILARITY
                    # =========================================================

def calculate_similarity(
    resume_embedding,
    jd_profile
):

    try:

        # -------------------------------------------------
        # RESUME EMBEDDING
        # -------------------------------------------------

        if not resume_embedding:

            logger.warning(
                "Resume embedding is missing"
            )

            return 0


        if len(resume_embedding) != 384:

            logger.error(
                "Invalid resume embedding dimension: "
                f"{len(resume_embedding)}"
            )

            return 0


        # -------------------------------------------------
        # JD PROFILE
        # -------------------------------------------------

        if not isinstance(
            jd_profile,
            dict
        ):

            logger.warning(
                "Invalid JD profile"
            )

            return 0


        jd_text = build_jd_semantic_text(
            jd_profile
        )


        if not jd_text:

            logger.warning(
                "Unable to build semantic JD text"
            )

            return 0


        # -------------------------------------------------
        # HASHING VECTORIZER
        # -------------------------------------------------

        vectorizer = get_embedding_model()


        # -------------------------------------------------
        # GENERATE JD VECTOR
        # -------------------------------------------------

        jd_vector = vectorizer.transform(
            [clean_text(jd_text)]
        )


        # -------------------------------------------------
        # RESUME VECTOR
        # -------------------------------------------------

        resume_vector = np.asarray(
            resume_embedding,
            dtype=float
        ).reshape(
            1,
            -1
        )


        # -------------------------------------------------
        # COSINE SIMILARITY
        # -------------------------------------------------

        similarity = cosine_similarity(
            resume_vector,
            jd_vector
        )[0][0]


        # -------------------------------------------------
        # CONVERT TO PERCENTAGE
        # -------------------------------------------------

        similarity_score = (
            float(similarity) * 100
        )


        # -------------------------------------------------
        # SAFETY BOUND
        # -------------------------------------------------

        similarity_score = max(
            0,
            min(
                similarity_score,
                100
            )
        )


        logger.info(
            f"Semantic similarity: "
            f"{similarity_score:.2f}%"
        )


        return round(
        similarity_score,
        2
        )


    except Exception as error:

        logger.exception(
            f"Semantic Similarity Error: {error}"
        )

        return 0