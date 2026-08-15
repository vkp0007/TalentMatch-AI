RESUME_EXTRACTION_PROMPT = """
You are an advanced ATS resume parser.

Analyze the following resume and extract structured information accurately.

EXTRACT:

1. Candidate Information
2. Technical Skills
3. Tools / Frameworks / Platforms
4. Work Experience
5. Projects
6. Education
7. Certifications
8. Training
9. Achievements
10. Professional Summary

IMPORTANT EXTRACTION RULES:

- Extract technical skills explicitly mentioned in the resume.
- Normalize skill names where appropriate.
- Avoid duplicates.
- Include frameworks, libraries, databases, cloud tools, APIs, programming languages,
  AI/ML technologies, and development tools.
- Technologies clearly mentioned within projects may also be included in technicalSkills.
- Do not invent information.
- Do not infer technologies that are not clearly supported by the resume.
- Keep extracted skills concise.
- Return empty arrays if data is unavailable.
- Return empty strings if values are unavailable.
- Keep certifications separate from training.
- Keep achievements separate from certifications and training.

SKILL NORMALIZATION EXAMPLES:

Use:
- "reactjs" instead of "React JS"
- "node.js" instead of "NodeJS"
- "express.js"
- "mongodb"
- "tailwind css"
- "restful apis"
- "machine learning"
- "deep learning"
- "natural language processing"

STRICT RULES:

- Return ONLY valid JSON.
- No markdown.
- No explanations.
- No comments.
- No extra text.
- Use double quotes only.
- Ensure valid JSON formatting.
- Email addresses must be returned as plain email addresses.
- Do not return Markdown links for email, LinkedIn, or GitHub.


JSON STRUCTURE:

{
    "candidateInfo": {
        "name": "",
        "email": "",
        "phone": "",
        "linkedin": "",
        "github": ""
    },

    "technicalSkills": [],

    "tools": [],

    "experience": [
        {
            "company": "",
            "role": "",
            "duration": "",
            "description": []
        }
    ],

    "projects": [
        {
            "name": "",
            "technologies": [],
            "description": []
        }
    ],

    "education": [
        {
            "degree": "",
            "institution": "",
            "year": ""
        }
    ],

    "certifications": [],

    "training": [],

    "achievements": [],

    "candidateSummary": ""
}


Resume:
"""

JD_EXTRACTION_PROMPT = """
You are an advanced ATS job description parser.

Analyze the following job description and extract structured hiring requirements accurately.

EXTRACT:

1. Target role
2. Required skills
3. Preferred skills
4. Education requirements
5. Experience requirements
6. Responsibilities
7. Domain / Industry

EDUCATION EXTRACTION RULES:

- Extract explicit educational requirements such as bachelor's degree, master's degree, diploma, or specific fields of study.
- Separate required education from preferred education.
- Do not classify education requirements as skills.
- Extract only education requirements supported by the job description.
- If no education requirement is mentioned, return empty required and preferred arrays.
- Keep each education requirement concise.
- Do not infer a degree requirement unless explicitly stated.

IMPORTANT EXTRACTION RULES:

- Extract relevant technical and professional skills.
- Normalize skill names for consistency.
- Avoid duplicates.
- Separate required skills from preferred skills carefully.
- Extract technologies, frameworks, tools, methodologies, and engineering concepts.
- Keep skill names concise and lowercase.
- Ignore company marketing and filler content.
- Do not invent requirements that are not supported by the job description.

SKILL NORMALIZATION EXAMPLES:

Use:
- "reactjs"
- "node.js"
- "express.js"
- "mongodb"
- "restful apis"
- "machine learning"
- "front-end development"
- "responsive web design"
- "back-end web development"
- "software development processes"


STRICT RULES:

- Return ONLY valid JSON.
- No markdown.
- No explanations.
- No comments.
- No extra text.
- Use double quotes only.
- Ensure valid JSON formatting.



JSON STRUCTURE:

{
    "role": "",
    "requiredSkills": [],
    "preferredSkills": [],
    "educationRequirements": {
        "required": [],
        "preferred": []
    },
    "experienceRequirements": "",
    "responsibilities": [],
    "domain": ""
}

Job Description:
    """