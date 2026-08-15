import re


def clean_json_response(text):

    if not text:
        return ""


    text = text.strip()


    # =====================================================
    # REMOVE MARKDOWN CODE BLOCKS
    # =====================================================

    text = re.sub(
        r"```json",
        "",
        text,
        flags=re.IGNORECASE
    )

    text = text.replace(
        "```",
        ""
    )


    # =====================================================
    # REMOVE TRAILING COMMAS
    # =====================================================

    text = re.sub(
        r",\s*}",
        "}",
        text
    )

    text = re.sub(
        r",\s*]",
        "]",
        text
    )


    return text.strip()