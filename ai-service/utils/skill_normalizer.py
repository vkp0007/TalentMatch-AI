NORMALIZED_SKILLS = {

    "react js": "reactjs",
    "react.js": "reactjs",
    "react": "reactjs",

    "nodejs": "node.js",
    "node js": "node.js",

    "express": "express.js",

    "mongo db": "mongodb",

    "tailwind": "tailwind css",
    "tailwindcss": "tailwind css",

    "rest api": "restful apis",
    "rest apis": "restful apis",

    "machine-learning": "machine learning",
    "deep-learning": "deep learning",

    "nlp": "natural language processing"
}



def normalize_skill_name(skill):

    skill = skill.lower().strip()

    return NORMALIZED_SKILLS.get(
        skill,
        skill
    )