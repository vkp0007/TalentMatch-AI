import re
import spacy

from skills import SKILLS

nlp = spacy.load("en_core_web_sm")


BLACKLIST = {
    "college",
    "school",
    "university",
    "india",
    "delhi",
    "kerala",
    "education",
    "project",
    "projects",
    "training",
    "achievement",
    "achievements",
    "technology",
    "technologies",
    "platforms"
}


REMOVE_WORDS = {
    "the",
    "a",
    "an",
    "improved",
    "integrated",
    "optimized",
    "developed",
    "built",
    "performed",
    "added",
    "responsive",
    "candidate",
    "technical",
    "skills",
    "skill",
    "project",
    "projects"
}


def clean_text(text):

    text = text.lower()

    text = re.sub(r"[|•,:()\n]", " ", text)

    text = re.sub(r"\s+", " ", text)

    return text.strip()


def normalize_phrase(phrase):

    words = phrase.split()

    filtered_words = [
        word for word in words
        if word not in REMOVE_WORDS
    ]

    return " ".join(filtered_words).strip()


def is_valid_phrase(phrase):

    if len(phrase) < 3:
        return False

    # remove numbers
    if any(char.isdigit() for char in phrase):
        return False

    # blacklist
    if phrase in BLACKLIST:
        return False

    # very long noisy phrases
    if len(phrase.split()) > 3:
        return False

    return True


def extract_skills_nlp(text):

    text = clean_text(text)

    doc = nlp(text)

    extracted_skills = set()

    # predefined skills
    for skill in SKILLS:

        if skill.lower() in text:
            extracted_skills.add(skill.lower())

    # noun chunks
    for chunk in doc.noun_chunks:

        phrase = normalize_phrase(
            chunk.text.strip()
        )

        if is_valid_phrase(phrase):
            extracted_skills.add(phrase)

    # entities
    for ent in doc.ents:

        if ent.label_ in ["PRODUCT", "ORG"]:

            entity = normalize_phrase(
                ent.text.strip()
            )

            if is_valid_phrase(entity):
                extracted_skills.add(entity)

    return sorted(list(extracted_skills))