import os
import re
import logging

import pdfplumber
import pymupdf

from docx import Document


logger = logging.getLogger(__name__)


SUPPORTED_EXTENSIONS = [
    ".pdf",
    ".docx"
]


def clean_text(text):

    if not text:
        return ""

    text = " ".join(
        text.split()
    )

    text = re.sub(
        r"[\x00-\x1F\x7F]",
        " ",
        text
    )

    return text.strip()


def extract_pdf_text(file_path):

    text = ""


    # =====================================================
    # PDFPLUMBER
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
            f"PDFPlumber extraction failed: {str(error)}"
        )


        # =====================================================
        # PYMUPDF FALLBACK
        # =====================================================

    if len(text.strip()) < 50:

            try:

                doc = pymupdf.open(file_path)

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
                    f"PyMuPDF extraction failed: {str(error)}"
                )


                # =====================================================
                # CLEAN
                # =====================================================

    text = clean_text(
        text
    )


    if len(text) < 30:

        logger.warning(
        "Low PDF extraction quality detected."
        )


    return text


def extract_docx_text(file_path):

    try:

        doc = Document(
            file_path
        )


        text = "\n".join(

            [

                para.text

                for para in doc.paragraphs

                if para.text.strip()

            ]
        )


        text = clean_text(
            text
        )


        if len(text) < 30:

            logger.warning(
                "Low DOCX extraction quality detected."
            )


        return text


    except Exception as error:

        logger.error(
            f"DOCX extraction error: {str(error)}"
        )

        return ""


def extract_resume_text(
    file_path
):

    try:

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


        if extension not in SUPPORTED_EXTENSIONS:

            logger.error(
                f"Unsupported file format: {extension}"
            )

            return ""


        if extension == ".pdf":

            return extract_pdf_text(
             file_path
            )


        return extract_docx_text(
            file_path
          )


    except Exception as error:

        logger.error(
            f"Resume text extraction error: {str(error)}"
        )

        return ""