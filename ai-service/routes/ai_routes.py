from fastapi import (
    APIRouter,
    UploadFile,
    File
)

from pydantic import BaseModel

from typing import (
    List,
    Dict,
    Any
)


from extraction.parser import (
    extract_resume_text
)


from extraction.llm_extractor import (
    extract_resume_data
)


from matching.embedding_service import (
    generate_embedding
)


from matching.semantic_matcher import (
    calculate_similarity
)


from matching.skill_matcher import (
    compare_skills
)


from matching.scoring import (
    calculate_final_score
)


from extraction.jd_extractor import (
    extract_jd_data
)


from matching.eligibility_matcher import (
    check_eligibility
)


router = APIRouter()


# =========================================================
# REQUEST MODELS
# =========================================================

class AnalyzeRequest(BaseModel):

    resumeData: Dict[str, Any]

    resumeEmbedding: List[float]

    jobDescription: str


    # =========================================================
    # EXTRACT RESUME
    # =========================================================

@router.post("/extract-resume")
async def extract_resume(
    file: UploadFile = File(...)
):

        # -----------------------------------------------------
        # Validate file
        # -----------------------------------------------------

    if not file:

        return {

            "success": False,

            "message":
                "No resume file uploaded"
        }


        # -----------------------------------------------------
        # Read uploaded file
        # -----------------------------------------------------

    file_bytes = await file.read()


    if not file_bytes:

        return {

            "success": False,

            "message":
                "Uploaded resume is empty"
        }


        # -----------------------------------------------------
        # Extract text from PDF/DOCX
        # -----------------------------------------------------

    extracted_text = (
        extract_resume_text(
            file_bytes,
            file.filename
        )
    )


    if not extracted_text:

        return {

            "success": False,

            "message":
                 "Unable to extract resume text"
        }


        # -----------------------------------------------------
        # LLM structured extraction
        # -----------------------------------------------------

    resume_data = (
        extract_resume_data(
            extracted_text
        )
    )


        # -----------------------------------------------------
        # Resume embedding
        # -----------------------------------------------------

    embedding = (
        generate_embedding(
            extracted_text
        )
    )


    if not embedding:

        return {

            "success": False,

            "message":
                "Unable to generate resume embedding"
        }


        # -----------------------------------------------------
        # Response
        # -----------------------------------------------------

    return {

        "success": True,

        "extractedText":
            extracted_text,

        "resumeData":
            resume_data,

        "embedding":
            embedding
    }


                # =========================================================
                # ANALYZE JOB
                # =========================================================

@router.post("/analyze-job")
def analyze_job(
    request: AnalyzeRequest
):

        # -----------------------------------------------------
        # Validation
        # -----------------------------------------------------

    if not request.resumeData:

        return {

            "success": False,

            "message":
                "Resume data is required"
        }


    if not request.resumeEmbedding:

        return {

            "success": False,

            "message":
                "Resume embedding is required"
        }


    if not request.jobDescription.strip():

        return {

            "success": False,

            "message":
                "Job description is required"
        }


        # -----------------------------------------------------
        # JD extraction
        # -----------------------------------------------------

    jd_profile = extract_jd_data(
        request.jobDescription
    )


        # -----------------------------------------------------
        # Semantic similarity
        # -----------------------------------------------------

    semantic_score = calculate_similarity(
        request.resumeEmbedding,
        jd_profile
    )


        # -----------------------------------------------------
        # Skill matching
        # -----------------------------------------------------

    skill_analysis = compare_skills(

        request.resumeData,

        jd_profile
    )


        # -----------------------------------------------------
        # Eligibility matching
        # -----------------------------------------------------

    eligibility = check_eligibility(

        request.resumeData,

        jd_profile
    )


        # -----------------------------------------------------
        # Final score
        # -----------------------------------------------------

    final_score = calculate_final_score(

        semantic_score,

        skill_analysis["skillScore"],

        skill_analysis["matchedSkills"],

        skill_analysis["missingSkills"]
    )


        # -----------------------------------------------------
        # Response
        # -----------------------------------------------------

    return {

        "success": True,

        "jdProfile":
            jd_profile,

        "analysis": {


            "semanticScore":
                semantic_score,


            "skillScore":
                skill_analysis[
                            "skillScore"
                ],

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


                                    # -----------------------------
                                    # Eligibility
                                    # -----------------------------

            "educationMatch":
                eligibility[
                        "educationMatch"
                ],

            "experienceMatch":
                eligibility[
                        "experienceMatch"
                ],

            "eligibilityWarnings":
                eligibility[
                        "eligibilityWarnings"
                ],


                                                # -----------------------------
                                                # Final
                                                # -----------------------------

            "finalScore":
                     final_score
        }
    }