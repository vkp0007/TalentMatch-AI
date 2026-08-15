def calculate_final_score(
    semantic_score,
    skill_score,
    matched_skills=None,
    missing_skills=None
):

    matched_skills = matched_skills or []

    missing_skills = missing_skills or []


    # =====================================================
    # BASE SCORE
    # =====================================================

    # Skill alignment is more important than
    # semantic similarity.

    score = (
        0.65 * skill_score
        +
        0.35 * semantic_score
    )


    # =====================================================
    # MISSING SKILL PENALTY
    # =====================================================

    # Avoid over-penalizing candidates.

    missing_penalty = min(
        len(missing_skills) * 1.5,
        10
    )

    score -= missing_penalty


    # =====================================================
    # MATCH BONUS
    # =====================================================

    if len(matched_skills) >= 8:

        score += 5

    elif len(matched_skills) >= 5:

        score += 3


        # =====================================================
        # SEMANTIC BONUS
        # =====================================================

    if semantic_score >= 85:

        score += 3


            # =====================================================
            # NORMALIZE
            # =====================================================

    score = max(
            0,
            min(score, 100)
    )


    return round(
        score,
        2
    )