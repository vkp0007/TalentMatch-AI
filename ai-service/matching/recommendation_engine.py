import os

import logging

from groq import Groq

from dotenv import load_dotenv


# =========================================================
# ENV
# =========================================================

load_dotenv()


# =========================================================
# LOGGER
# =========================================================

logging.basicConfig(
    level=logging.INFO
)

logger = logging.getLogger(__name__)


# =========================================================
# GROQ CLIENT
# =========================================================

client = Groq(

    api_key=os.getenv(
        "GROQ_API_KEY"
    )
)


MODEL_NAME = (
    "llama-3.3-70b-versatile"
)



# =========================================================
# FALLBACK RECOMMENDATIONS
# =========================================================

FALLBACK_RECOMMENDATIONS = [

    "Add more role-specific technical skills.",

    "Improve ATS keyword alignment with the job description.",

    "Include measurable project achievements and outcomes.",

    "Strengthen resume impact using concise technical descriptions."
]



# =========================================================
# CLEAN RECOMMENDATIONS
# =========================================================

def clean_recommendations(
    recommendations
):

    cleaned = []


    for recommendation in recommendations:

        recommendation = (
            recommendation
            .strip("- ")
            .strip()
        )


        # avoid empty lines
        if len(recommendation) < 10:
            continue


        # remove duplicates
        if recommendation not in cleaned:

            cleaned.append(
                recommendation
            )


    return cleaned



# =========================================================
# GENERATE RECOMMENDATIONS
# =========================================================

def generate_recommendations(

    target_role,

    matched_skills,

    missing_skills,

    final_score
):

    try:

        # =================================================
        # HIGH SCORE OPTIMIZATION
        # =================================================

        if (

            final_score >= 85

            and

            len(missing_skills) == 0
        ):

            return [

                "Your resume is already strongly aligned with the target role.",

                "Continue improving project impact using measurable achievements.",

                "Tailor resume keywords slightly for each application.",

                "Maintain ATS-friendly formatting and concise technical descriptions."
            ]


        # =================================================
        # LIMIT SKILLS
        # =================================================

        matched_skills = (
            matched_skills[:12]
        )

        missing_skills = (
            missing_skills[:12]
        )


        # =================================================
        # PROMPT
        # =================================================

        prompt = f"""

You are an advanced ATS resume optimization coach.

Generate concise, high-quality, actionable resume improvement recommendations.


Target Role:
{target_role}


Matched Skills:
{", ".join(matched_skills)}


Missing Skills:
{", ".join(missing_skills)}


ATS Score:
{final_score}


IMPORTANT RULES:

- Return EXACTLY 4 recommendations
- Keep each recommendation under 20 words
- Be specific and actionable
- Focus on:
  - missing technical skills
  - ATS optimization
  - project improvements
  - resume impact
  - measurable achievements
- Avoid generic career advice
- Avoid repeating the same idea
- Avoid numbering
- Avoid markdown
- Return plain text list only
"""


        # =================================================
        # LLM CALL
        # =================================================

        completion = (

            client.chat.completions.create(

                model=MODEL_NAME,

                messages=[

                    {
                        "role": "user",

                        "content": prompt
                    }
                ],

                temperature=0.2
            )
        )


        content = (

            completion.choices[0]
            .message.content
        )


        # =================================================
        # PARSE RESPONSE
        # =================================================

        recommendations = [

            line.strip()

            for line in content.split("\n")

            if line.strip()
        ]


        # =================================================
        # CLEAN RESPONSE
        # =================================================

        recommendations = (
            clean_recommendations(
                recommendations
            )
        )


        # =================================================
        # EMPTY FALLBACK
        # =================================================

        if len(recommendations) == 0:

            recommendations = (
                FALLBACK_RECOMMENDATIONS.copy()
            )


        # =================================================
        # LIMIT TO 4
        # =================================================

        recommendations = (
            recommendations[:4]
        )


        # =================================================
        # PAD FALLBACKS
        # =================================================

        while len(recommendations) < 4:

            for fallback in FALLBACK_RECOMMENDATIONS:

                if fallback not in recommendations:

                    recommendations.append(
                        fallback
                    )


                if len(recommendations) == 4:
                    break


        return recommendations


    except Exception as error:

        logger.error(

            f"Recommendation Generation Error: {str(error)}"
        )


        return (
            FALLBACK_RECOMMENDATIONS.copy()
        )