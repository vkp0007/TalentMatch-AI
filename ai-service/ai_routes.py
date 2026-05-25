from fastapi import APIRouter

from pydantic import BaseModel

from typing import List, Dict, Any


from extraction.parser import (
    extract_resume_text
)

from extraction.llm_extractor import (
    extract_resume_data
)

from matching.semantic_matcher import (

    generate_embedding,

    calculate_similarity
)

from matching.skill_matcher import (
    compare_skills
)

from matching.scoring import (
    calculate_final_score
)

from matching.recommendation_engine import (
    generate_recommendations
)

from extraction.jd_extractor import (
    extract_jd_data
)

router = APIRouter()



# request models
class ExtractRequest(
    BaseModel
):

    filePath: str



class AnalyzeRequest(
    BaseModel
):

    resumeText: str

    parsedData: Dict[str, Any]

    embedding: List[float]

    jobDescription: str



# extract resume endpoint
@router.post("/extract-text")
def extract_text(
    request: ExtractRequest
):

    # parse resume
    extracted_text = (
        extract_resume_text(
            request.filePath
        )
    )


    # structured extraction
    resume_data = (
        extract_resume_data(
            extracted_text
        )
    )


    # embedding generation
    embedding = (
        generate_embedding(
            extracted_text
        )
    )


    return {

        "extractedText":
            extracted_text,

        "resumeData":
            resume_data,

        "embedding":
            embedding
    }



# analyze resume endpoint
@router.post("/analyze-resume")
def analyze_resume(
    request: AnalyzeRequest
):

    # semantic similarity
    semantic_score = (
        calculate_similarity(

            request.embedding,

            request.jobDescription
        )
    )


    # temporary JD profile
    jd_profile = (
    extract_jd_data(
        request.jobDescription
    )
)


    # skill analysis
    skill_analysis = (
        compare_skills(

            request.parsedData,

            jd_profile
        )
    )


    # final ATS score
    final_score = (
        calculate_final_score(

            semantic_score,

            skill_analysis[
                "skillScore"
            ]
        )
    )


    # recommendations
    recommendations = (
        generate_recommendations(

            target_role=jd_profile.get(
        "role",
        "Software Engineer"
    ),

            matched_skills=
                skill_analysis[
                    "matchedSkills"
                ],

            missing_skills=
                skill_analysis[
                    "missingSkills"
                ],

            final_score=
                final_score
        )
    )


    return {

        "semanticScore":
            semantic_score,

        "skillScore":
            skill_analysis[
                "skillScore"
            ],

        "finalScore":
            final_score,

        "matchedSkills":
            skill_analysis[
                "matchedSkills"
            ],

        "missingSkills":
            skill_analysis[
                "missingSkills"
            ],

        "additionalSkills":
            skill_analysis[
                "additionalSkills"
            ],

        "recommendations":
            recommendations
    }