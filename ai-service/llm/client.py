import os
import logging

from groq import Groq
from dotenv import load_dotenv


# =========================================================
# ENVIRONMENT
# =========================================================

load_dotenv()


# =========================================================
# LOGGER
# =========================================================

logger = logging.getLogger(__name__)


# =========================================================
# CONFIGURATION
# =========================================================

MODEL_NAME = "openai/gpt-oss-20b"

GROQ_API_KEY = os.getenv(
    "GROQ_API_KEY"
)


if not GROQ_API_KEY:

    raise RuntimeError(
        "GROQ_API_KEY environment variable is not configured."
    )


# =========================================================
# GROQ CLIENT
# =========================================================

client = Groq(
    api_key=GROQ_API_KEY
)


# =========================================================
# GENERATE COMPLETION
# =========================================================

def generate_completion(
    prompt: str,
    temperature: float = 0.1
) -> str:

    if not prompt or not prompt.strip():

        raise ValueError(
            "Prompt cannot be empty."
        )


    try:

        completion = client.chat.completions.create(

            model=MODEL_NAME,

            messages=[

                {
                   "role": "user",
                   "content": prompt
                }

            ],

            temperature=temperature,

            max_completion_tokens=4096,

            reasoning_effort="low",

            include_reasoning=False,


            response_format={
                "type": "json_object"
            },

            stream=False
        )


    # =================================================
    # DEBUG RESPONSE
    # =================================================

        if not completion.choices:

            raise ValueError(
                "LLM returned no choices."
            )


        message = (
            completion
            .choices[0]
             .message
        )


        logger.info(
            "LLM finish reason: %s",
            completion.choices[0].finish_reason
        )


        logger.info(
            "LLM usage: %s",
            completion.usage
        )


# =================================================
# GET CONTENT
# =================================================

        content = (
            message.content
        )


# =================================================
# EMPTY RESPONSE
# =================================================

        if not content:

            logger.error(
                "LLM returned empty content."
            )

            logger.error(
                "LLM message: %s",
                message
            )

            raise ValueError(
                "LLM returned an empty response."
           )


# =================================================
# RETURN
# =================================================

        return content.strip()


    except Exception as error:

        logger.exception(
            "Groq completion error: %s",
            error
        )

        raise