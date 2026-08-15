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

MODEL_NAME = "llama-3.3-70b-versatile"

GROQ_API_KEY = os.getenv("GROQ_API_KEY")


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


    completion = client.chat.completions.create(

        model=MODEL_NAME,

        messages=[

           {
              "role": "user",
              "content": prompt
           }

       ],

        temperature=temperature
   )


    content = (
    completion
    .choices[0]
    .message
    .content
    )


    if not content:

       raise ValueError(
            "LLM returned an empty response."
        )


    return content.strip()