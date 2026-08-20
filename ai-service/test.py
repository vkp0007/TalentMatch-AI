import os

from dotenv import load_dotenv
from groq import Groq


# Load .env
load_dotenv()


# Read API key
api_key = os.getenv("GROQ_API_KEY")


print(
    "API key loaded:",
    bool(api_key)
)


if not api_key:

    raise RuntimeError(
"GROQ_API_KEY was not loaded. "
"Check your .env file."
)


# Create Groq client
client = Groq(
    api_key=api_key
)


# Get available models
models = client.models.list()


print("\nAvailable models:\n")


for model in models.data:

    print(
        model.id
    )