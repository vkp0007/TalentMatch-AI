import multer from "multer";
import path from "path";


// =========================================================
// STORAGE
// =========================================================

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() +
            "-" +
            file.originalname;

        cb(null, uniqueName);
    }
});


// =========================================================
// FILE FILTER
// =========================================================

const fileFilter = (req, file, cb) => {

    const extension =
        path.extname(
            file.originalname
        ).toLowerCase();


    const allowedExtensions = [
        ".pdf",
        ".docx"
    ];


    const allowedMimeTypes = [
        "application/pdf",

        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

        "application/octet-stream"
    ];


    // -----------------------------------------------------
    // Validate extension
    // -----------------------------------------------------

    if (
        !allowedExtensions.includes(
            extension
        )
    ) {

        return cb(
            new Error(
                "Only PDF and DOCX files are allowed"
            ),
            false
        );
    }


    // -----------------------------------------------------
    // Validate MIME type
    // -----------------------------------------------------

    if (
        !allowedMimeTypes.includes(
            file.mimetype
        )
    ) {

        return cb(
            new Error(
                "Invalid file type"
            ),
            false
        );
    }


    cb(null, true);
};


// =========================================================
// MULTER
// =========================================================

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize:
            5 * 1024 * 1024
    }
});


export default upload;