import logging

from models.embedding_model import (
    get_embedding_model
)

from sklearn.metrics.pairwise import (
    cosine_similarity
)



# =========================================================
# LOGGER
# =========================================================

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

        text
        .replace("\n", " ")
        .replace("\t", " ")
        .strip()
    )



# =========================================================
# GENERATE EMBEDDINGS
# =========================================================

def generate_embedding(text):

    try:

        text = clean_text(text)


        # =================================================
        # VALIDATION
        # =================================================

        if not text:

            logger.warning(
                "Empty text received for embedding generation"
            )

            return []


        # =================================================
        # TOKEN SAFETY
        # =================================================

        text = text[:12000]


        # =================================================
        # GENERATE EMBEDDING
        # =================================================

        model = (
        get_embedding_model()
                )

        embedding = (
            model.encode(text)
              )


        return embedding.tolist()


    except Exception as error:

        logger.error(

            f"Embedding Generation Error: {str(error)}"
        )

        return []



# =========================================================
# CALCULATE SEMANTIC SIMILARITY
# =========================================================

def calculate_similarity(

    resume_embedding,

    job_description
):

    try:

        # =================================================
        # VALIDATION
        # =================================================

        if (

            not resume_embedding

            or

            not job_description
        ):

            logger.warning(
                "Missing resume embedding or job description"
            )

            return 0


        # =================================================
        # CLEAN JOB DESCRIPTION
        # =================================================

        job_description = clean_text(
            job_description
        )


        if not job_description:

            logger.warning(
                "Cleaned job description is empty"
            )

            return 0


        # =================================================
        # TOKEN SAFETY
        # =================================================

        job_description = (
            job_description[:12000]
        )


        # =================================================
        # GENERATE JD EMBEDDING
        # =================================================

        model = (
        get_embedding_model()
         )

        jd_embedding = (
         model.encode(
        job_description
          )
      )


        # =================================================
        # COSINE SIMILARITY
        # =================================================

        similarity_score = (
            cosine_similarity(

                [resume_embedding],

                [jd_embedding]

            )[0][0]
        )


        # =================================================
        # NORMALIZE SCORE
        # =================================================

        similarity_score = (
            float(similarity_score * 100)
        )


        # =================================================
        # ATS REALISM NORMALIZATION
        # =================================================

        similarity_score = max(
            0,
            min(similarity_score, 95)
        )


        return round(

            similarity_score,

            2
        )


    except Exception as error:

        logger.error(

            f"Semantic Similarity Error: {str(error)}"
        )

        return 0