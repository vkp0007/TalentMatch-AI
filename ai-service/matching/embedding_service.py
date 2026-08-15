import logging

from models.embedding_model import (
    get_embedding_model
)


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
# GENERATE EMBEDDING
# =========================================================

def generate_embedding(text):

    try:

        text = clean_text(text)

        if not text:

            logger.warning(
                "Empty text received for embedding"
            )

            return []


        # -------------------------------------------------
        # TOKEN SAFETY
        # -------------------------------------------------

        text = text[:8000]


        # -------------------------------------------------
        # MODEL
        # -------------------------------------------------

        model = get_embedding_model()


        # -------------------------------------------------
        # EMBEDDING
        # -------------------------------------------------

        embedding = model.encode(
            text,
            normalize_embeddings=True
        )


        # -------------------------------------------------
        # VALIDATE DIMENSION
        # -------------------------------------------------

        if len(embedding) != 384:

            logger.error(
                f"Unexpected embedding dimension: "
                f"{len(embedding)}"
            )

            return []


        return embedding.tolist()


    except Exception as error:

        logger.error(
            f"Embedding Generation Error: {error}"
        )

        return []