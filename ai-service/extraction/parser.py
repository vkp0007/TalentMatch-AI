import os

import re

import logging

import pdfplumber

import fitz

from docx import Document



# =========================================================
# LOGGER
# =========================================================

logging.basicConfig(
    level=logging.INFO
)

logger = logging.getLogger(__name__)



# =========================================================
# SUPPORTED FILES
# =========================================================

SUPPORTED_EXTENSIONS = [

    ".pdf",

    ".docx"
]



# =========================================================
# CLEAN TEXT
# =========================================================

def clean_text(text):

    if not text:

        return ""


    # remove extra spaces
    text = " ".join(
        text.split()
    )


    # remove non-ascii artifacts
    text = re.sub(

        r"[\x00-\x1F\x7F]",

        " ",

        text
    )


    return text.strip()



# =========================================================
# PDF EXTRACTION
# =========================================================

def extract_pdf_text(file_path):

    text = ""


    # =====================================================
    # FIRST ATTEMPT: PDFPLUMBER
    # =====================================================

    try:

        with pdfplumber.open(
            file_path
        ) as pdf:

            for page in pdf.pages:

                extracted = (
                    page.extract_text()
                )

                if extracted:

                    text += (
                        extracted + "\n"
                    )


    except Exception as error:

        logger.warning(

            f"PDFPlumber Extraction Failed: {str(error)}"
        )


    # =====================================================
    # FALLBACK: PYMUPDF
    # =====================================================

    if len(text.strip()) < 50:

        try:

            doc = fitz.open(file_path)

            for page in doc:

                extracted = (
                    page.get_text()
                )

                if extracted:

                    text += (
                        extracted + "\n"
                    )

            doc.close()


        except Exception as error:

            logger.warning(

                f"PyMuPDF Extraction Failed: {str(error)}"
            )


    # =====================================================
    # FINAL CLEANING
    # =====================================================

    text = clean_text(text)


    # extraction validation
    if len(text) < 30:

        logger.warning(
            "Low PDF extraction quality detected"
        )


    return text



# =========================================================
# DOCX EXTRACTION
# =========================================================

def extract_docx_text(file_path):

    try:

        doc = Document(file_path)


        text = "\n".join(

            [

                para.text

                for para in doc.paragraphs

                if para.text.strip()
            ]
        )


        text = clean_text(text)


        # extraction validation
        if len(text) < 30:

            logger.warning(
                "Low DOCX extraction quality detected"
            )


        return text


    except Exception as error:

        logger.error(

            f"DOCX Extraction Error: {str(error)}"
        )

        return ""



# =========================================================
# MAIN EXTRACTION FUNCTION
# =========================================================

def extract_resume_text(file_path):

    try:

        # =================================================
        # FILE VALIDATION
        # =================================================

        if not os.path.exists(
            file_path
        ):

            logger.error(

                f"File does not exist: {file_path}"
            )

            return ""


        extension = os.path.splitext(
            file_path
        )[1].lower()


        # =================================================
        # UNSUPPORTED FILE
        # =================================================

        if extension not in (
            SUPPORTED_EXTENSIONS
        ):

            logger.error(

                f"Unsupported file format: {extension}"
            )

            return ""


        # =================================================
        # PDF
        # =================================================

        if extension == ".pdf":

            return extract_pdf_text(
                file_path
            )


        # =================================================
        # DOCX
        # =================================================

        return extract_docx_text(
            file_path
        )


    except Exception as error:

        logger.error(

            f"Resume Extraction Error: {str(error)}"
        )

        return ""