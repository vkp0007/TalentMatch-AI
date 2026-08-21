import { Resume }
from "../models/resume.model.js";

import {
    extractResume
}
from "./ai.service.js";


// =========================================================
// UPLOAD RESUME
// =========================================================

export const uploadResumeService = async ({
    file,
    userId,
    resumeName,
    targetRole
}) => {

    if (!file) {

        throw new Error(
            "No file uploaded"
        );
    }


    if (!file.buffer) {

        throw new Error(
            "Resume file buffer is missing"
        );
    }


    if (!resumeName?.trim()) {

        throw new Error(
            "Resume name is required"
        );
    }


    // =====================================================
    // PYTHON AI SERVICE
    // =====================================================

    const extractedData =
        await extractResume(
            file
        );


    // =====================================================
    // VALIDATE AI RESPONSE
    // =====================================================

    if (
        !extractedData ||
        !extractedData.success
    ) {

        throw new Error(
            extractedData?.message ||
            "Resume extraction failed"
        );
    }


    // =====================================================
    // VALIDATE EMBEDDING
    // =====================================================

    const embedding =
        extractedData.embedding || [];


    if (
        embedding.length !== 384
    ) {

        throw new Error(
            "Invalid resume embedding generated"
        );
    }


    // =====================================================
    // SAVE RESUME
    // =====================================================

    const resume =
        await Resume.create({

            userId,

            resumeName:
                resumeName.trim(),

            targetRole:
                targetRole?.trim() || "",

            originalFileName:
                file.originalname,

            resumeText:
                extractedData.extractedText ||
                "",

            parsedData:
                extractedData.resumeData ||
                {},

            embedding

        });


    return resume;
};


// =========================================================
// GET RESUME BY ID
// =========================================================

export const getResumeByIdService = async ({
    resumeId,
    userId
}) => {

    const resume =
        await Resume.findOne({

            _id: resumeId,

            userId

        })
        .select(
            "_id resumeName targetRole originalFileName parsedData createdAt"
        );


    return resume;
};


// =========================================================
// DELETE RESUME
// =========================================================

export const deleteResumeService = async ({
    resumeId,
    userId
}) => {

    try {

        const deletedResume =
            await Resume.findOneAndDelete({

                _id: resumeId,

                userId

            });


        return deletedResume;

    } catch (error) {

        throw new Error(
            error.message ||
            "Failed to delete resume"
        );
    }
};