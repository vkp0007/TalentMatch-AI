import os
import pdfplumber
import fitz

from docx import Document


def extract_pdf_text(file_path):

    text = ""

    try:

        with pdfplumber.open(file_path) as pdf:

            for page in pdf.pages:

                extracted = page.extract_text()

                if extracted:
                    text += extracted + "\n"

    except Exception:

        doc = fitz.open(file_path)

        for page in doc:
            text += page.get_text()

    return text


def extract_docx_text(file_path):

    doc = Document(file_path)

    text = "\n".join(
        [paragraph.text for paragraph in doc.paragraphs]
    )

    return text


def extract_text(file_path):

    absolute_path = os.path.abspath(file_path)

    if absolute_path.endswith(".pdf"):
        return extract_pdf_text(absolute_path)

    elif absolute_path.endswith(".docx"):
        return extract_docx_text(absolute_path)

    return "Unsupported file format"