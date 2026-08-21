import io
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


# =========================================================
# CLEAN TEXT
# =========================================================

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


    # =========================================================
    # PDF EXTRACTION
    # =========================================================

def extract_pdf_text(file_bytes):

    text = ""


    # =====================================================
    # PDFPLUMBER
    # =====================================================

    try:

        pdf_stream = io.BytesIO(
            file_bytes
        )

        with pdfplumber.open(
            pdf_stream
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

            doc = pymupdf.open(
                  stream=file_bytes,
                  filetype="pdf"
            )

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


                # =========================================================
                # DOCX EXTRACTION
                # =========================================================

def extract_docx_text(file_bytes):

    try:

        doc_stream = io.BytesIO(
            file_bytes
        )

        doc = Document(
            doc_stream
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


    # =========================================================
    # RESUME TEXT EXTRACTION
    # =========================================================

def extract_resume_text(
    file_bytes,
    filename
):

    try:

        if not file_bytes:

            logger.error(
                "Empty resume file received."
            )

            return ""


        if not filename:

            logger.error(
                "Resume filename is missing."
            )

            return ""


        # -------------------------------------------------
        # GET FILE EXTENSION
        # -------------------------------------------------

        extension = (
            filename
            .lower()
            .rsplit(".", 1)[-1]
        )


        extension = (
            "." + extension
        )


        # -------------------------------------------------
        # VALIDATE FORMAT
        # -------------------------------------------------

        if extension not in SUPPORTED_EXTENSIONS:

            logger.error(
                f"Unsupported file format: {extension}"
            )

            return ""


        # -------------------------------------------------
        # PDF
        # -------------------------------------------------

        if extension == ".pdf":

            return extract_pdf_text(
              file_bytes
        )


    # -------------------------------------------------
    # DOCX
    # -------------------------------------------------

        if extension == ".docx":

            return extract_docx_text(
              file_bytes
            )


        return ""


    except Exception as error:

        logger.error(
            f"Resume text extraction error: {str(error)}"
        )

        return ""