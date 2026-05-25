def calculate_final_score(

    semantic_score,

    skill_score,

    matched_skills=None,

    missing_skills=None
):

    # =====================================================
    # DEFAULTS
    # =====================================================

    matched_skills = (
        matched_skills or []
    )

    missing_skills = (
        missing_skills or []
    )


    # =====================================================
    # BASE WEIGHTED SCORE
    # =====================================================

    # ATS priority:
    # skills > semantic similarity

    weighted_score = (

        0.65 * skill_score

        +

        0.35 * semantic_score
    )


    # =====================================================
    # MISSING SKILL PENALTY
    # =====================================================

    # penalize missing skills
    # but avoid over-penalizing

    missing_penalty = min(

        len(missing_skills) * 2,

        15
    )


    weighted_score -= (
        missing_penalty
    )


    # =====================================================
    # MATCH BONUS
    # =====================================================

    # reward strong alignment

    if len(matched_skills) >= 8:

        weighted_score += 5

    elif len(matched_skills) >= 5:

        weighted_score += 3


    # =====================================================
    # HIGH SEMANTIC BONUS
    # =====================================================

    if semantic_score >= 85:

        weighted_score += 3


    # =====================================================
    # NORMALIZE SCORE
    # =====================================================

    weighted_score = max(
        0,
        min(weighted_score, 100)
    )


    return round(

        weighted_score,

        2
    )