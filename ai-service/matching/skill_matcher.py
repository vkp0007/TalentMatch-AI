import logging

from sklearn.metrics.pairwise import cosine_similarity

from models.embedding_model import get_embedding_model
from utils.skill_normalizer import normalize_skill_name


logger = logging.getLogger(__name__)


SEMANTIC_THRESHOLD = 0.68


def normalize_skills(skills):
    return sorted({
        normalize_skill_name(str(skill))
        for skill in (skills or [])
        if skill
    })


def extract_candidate_skills(candidate_profile):
    skills = set()

    skills.update(
        normalize_skills(
            candidate_profile.get("technicalSkills", [])
        )
    )

    skills.update(
        normalize_skills(
            candidate_profile.get("tools", [])
        )
    )

    for project in candidate_profile.get("projects", []):
        skills.update(
            normalize_skills(
                project.get("technologies", [])
            )
        )

    return sorted(skills)


def semantic_match(
    candidate_skills,
    jd_skills,
    threshold=SEMANTIC_THRESHOLD
):
    if not candidate_skills or not jd_skills:
        return {}, set()

    model = get_embedding_model()

    candidate_embeddings = model.encode(candidate_skills)
    jd_embeddings = model.encode(jd_skills)

    similarities = cosine_similarity(
        jd_embeddings,
        candidate_embeddings
    )

    matches = {}
    used_candidates = set()

    for jd_index, jd_skill in enumerate(jd_skills):

        best_index = similarities[jd_index].argmax()
        best_score = similarities[jd_index][best_index]

        candidate_skill = candidate_skills[best_index]

        if (
            best_score >= threshold
            and candidate_skill not in used_candidates
        ):
            matches[jd_skill] = candidate_skill
            used_candidates.add(candidate_skill)

    return matches, used_candidates


def compare_skills(
    candidate_profile,
    jd_profile,
    threshold=SEMANTIC_THRESHOLD
):

    candidate_skills = extract_candidate_skills(
        candidate_profile
    )

    required_skills = normalize_skills(
        jd_profile.get("requiredSkills", [])
    )

    preferred_skills = normalize_skills(
        jd_profile.get("preferredSkills", [])
    )

    # Prevent required/preferred duplication
    preferred_skills = [
        skill
        for skill in preferred_skills
        if skill not in required_skills
    ]

    all_jd_skills = (
        required_skills +
        preferred_skills
    )

    if not all_jd_skills:
        return {
            "matchedSkills": [],
            "missingSkills": [],
            "additionalSkills": candidate_skills,
            "matchedRequiredSkills": [],
            "matchedPreferredSkills": [],
            "missingRequiredSkills": [],
            "missingPreferredSkills": [],
            "skillScore": 0
      }

# -----------------------------------------------------
# EXACT MATCHING
# -----------------------------------------------------

    candidate_set = set(candidate_skills)
    exact_matches = (
    candidate_set.intersection(all_jd_skills)
    )

    unmatched_jd = [
    skill
    for skill in all_jd_skills
    if skill not in exact_matches
    ]

    matched_candidate_skills = set(exact_matches)

# -----------------------------------------------------
# SEMANTIC MATCHING
# -----------------------------------------------------

    semantic_matches, semantic_candidates = semantic_match(
    [
        skill
        for skill in candidate_skills
        if skill not in matched_candidate_skills
    ],
    unmatched_jd,
    threshold
   )

    matched_candidate_skills.update(
    semantic_candidates
    )

    matched_skills = (
    exact_matches |
    set(semantic_matches.keys())
    )

# -----------------------------------------------------
# REQUIRED / PREFERRED
# -----------------------------------------------------

    matched_required = [
    skill
    for skill in required_skills
    if skill in matched_skills
    ]

    matched_preferred = [
    skill
    for skill in preferred_skills
    if skill in matched_skills
    ]

    missing_required = [
    skill
    for skill in required_skills
    if skill not in matched_skills
    ]

    missing_preferred = [
    skill
    for skill in preferred_skills
    if skill not in matched_skills
    ]

# -----------------------------------------------------
# ADDITIONAL SKILLS
# -----------------------------------------------------

    additional_skills = [
    skill
    for skill in candidate_skills
    if skill not in matched_candidate_skills
    ]

# -----------------------------------------------------
# SCORE
# -----------------------------------------------------

    required_score = (
        len(matched_required) /
        len(required_skills) * 100
        if required_skills
        else 100
    )

    preferred_score = (
       len(matched_preferred) /
       len(preferred_skills) * 100
       if preferred_skills
       else 100
    )

    skill_score = (
       0.80 * required_score +
       0.20 * preferred_score
   )

    return {
       "matchedSkills": sorted(matched_skills),

       "missingSkills": sorted(
           missing_required +
           missing_preferred
        ),

       "additionalSkills": sorted(
           additional_skills
        ),

       "matchedRequiredSkills": sorted(
          matched_required
        ),

       "matchedPreferredSkills": sorted(
          matched_preferred
        ),

       "missingRequiredSkills": sorted(
          missing_required
        ),

       "missingPreferredSkills": sorted(
          missing_preferred
        ),

      "skillScore": round(
          skill_score,
          2
       )
    }