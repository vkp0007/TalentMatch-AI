import {
    useRef,
    useState
} from "react";

import {
    CheckCircle2,
    FileText
} from "lucide-react";

import {
    uploadResume
} from "../../api/resume.api";

import ResumeUploadForm
    from "../../components/resume/ResumeUploadForm";


const ResumeUpload = () => {

    // =====================================================
    // STATE
    // =====================================================

    const [file, setFile] =
        useState(null);

    const [resumeName, setResumeName] =
        useState("");

    const [targetRole, setTargetRole] =
        useState("");

    const [uploading, setUploading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    // =====================================================
    // FILE INPUT REF
    // =====================================================

    const fileInputRef =
        useRef(null);


    // =====================================================
    // FILE CHANGE
    // =====================================================

    const handleFileChange = (
        event
    ) => {

        const selectedFile =
            event.target.files?.[0];


        setFile(
            selectedFile || null
        );


        setError("");
        setSuccess("");
    };


    // =====================================================
    // REMOVE SELECTED FILE
    // =====================================================

    const handleRemoveFile = () => {

        setFile(null);

        setError("");
        setSuccess("");


        if (fileInputRef.current) {

            fileInputRef.current.value = "";

        }
    };


    // =====================================================
    // UPLOAD
    // =====================================================

    const handleUpload = async () => {

        setError("");
        setSuccess("");


        // -------------------------------------------------
        // VALIDATION
        // -------------------------------------------------

        if (!resumeName.trim()) {

            setError(
                "Please enter a resume name."
            );

            return;
        }


        if (!targetRole.trim()) {

            setError(
                "Please enter the target role."
            );

            return;
        }


        if (!file) {

            setError(
                "Please select a resume."
            );

            return;
        }


        try {

            setUploading(true);


            // -------------------------------------------------
            // FORM DATA
            // -------------------------------------------------

            const formData =
                new FormData();


            formData.append(
                "resumeName",
                resumeName.trim()
            );


            formData.append(
                "targetRole",
                targetRole.trim()
            );


            formData.append(
                "resume",
                file
            );


            // -------------------------------------------------
            // UPLOAD
            // -------------------------------------------------

            await uploadResume(
                formData
            );


            // -------------------------------------------------
            // SUCCESS
            // -------------------------------------------------

            setSuccess(
                "Resume uploaded successfully."
            );


            // -------------------------------------------------
            // RESET FORM
            // -------------------------------------------------

            setResumeName("");
            setTargetRole("");
            setFile(null);


            if (fileInputRef.current) {

                fileInputRef.current.value = "";

            }


        } catch (error) {

            console.error(
                "Resume upload failed:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to upload resume."
            );


        } finally {

            setUploading(false);

        }
    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="
            min-h-screen
            bg-[#FDFBF7]
        ">

            <div className="
                max-w-5xl
                mx-auto
                px-5
                sm:px-6
                py-8
                sm:py-10
                pb-16
            ">


                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <div className="
                    mb-8
                    max-w-2xl
                ">


                    {/* TITLE */}

                    <h1 className="
                    
                        text-2xl
                        sm:text-3xl
                        font-semibold
                        tracking-tight
                        text-gray-900
                    ">

                        Upload Resume

                    </h1>


                    {/* DESCRIPTION */}

                    <p className="
                        mt-2
                        text-sm
                        sm:text-[15px]
                        leading-6
                        text-gray-500
                        max-w-xl
                    ">

                        Upload your resume to use it
                        for personalized job analysis.

                    </p>

                </div>


                {/* =================================================
                    UPLOAD CARD
                ================================================= */}

                <section className="
                    bg-[#F7F3EA]
                    border
                    border-[#E8E2D7]
                    rounded-2xl
                    shadow-sm
                    overflow-hidden
                    transition-all
                    duration-200
                    hover:shadow-md
                    hover:border-[#DCD4C6]
                ">





                    {/* =================================================
                        FORM AREA
                    ================================================= */}

                    <div className="
                        bg-white
                        px-3
                        sm:px-4
                        py-5
                    ">

                        <ResumeUploadForm

                            resumeName={
                                resumeName
                            }

                            targetRole={
                                targetRole
                            }

                            file={
                                file
                            }

                            uploading={
                                uploading
                            }

                            fileInputRef={
                                fileInputRef
                            }

                            onResumeNameChange={
                                event =>
                                    setResumeName(
                                        event.target.value
                                    )
                            }

                            onTargetRoleChange={
                                event =>
                                    setTargetRole(
                                        event.target.value
                                    )
                            }

                            onFileChange={
                                handleFileChange
                            }

                            onRemoveFile={
                                handleRemoveFile
                            }

                            onUpload={
                                handleUpload
                            }

                        />


                        {/* =================================================
                            ERROR
                        ================================================= */}

                        {error && (

                            <div className="
                                mt-5
                                rounded-xl
                                border
                                border-red-200
                                bg-red-50
                                px-4
                                py-3.5
                            ">

                                <div className="
                                    flex
                                    items-start
                                    gap-3
                                ">

                                    <div className="
                                        w-7
                                        h-7
                                        shrink-0
                                        rounded-lg
                                        bg-red-100
                                        flex
                                        items-center
                                        justify-center
                                        text-red-600
                                        text-xs
                                        font-bold
                                    ">

                                        !

                                    </div>


                                    <div>

                                        <p className="
                                            text-sm
                                            font-medium
                                            text-red-800
                                        ">

                                            Upload failed

                                        </p>


                                        <p className="
                                            text-xs
                                            leading-5
                                            text-red-700
                                            mt-0.5
                                        ">

                                            {error}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        )}


                        {/* =================================================
                            SUCCESS
                        ================================================= */}

                        {success && (

                            <div className="
                                mt-5
                                rounded-xl
                                border
                                border-emerald-200
                                bg-emerald-50
                                px-4
                                py-3.5
                            ">

                                <div className="
                                    flex
                                    items-start
                                    gap-3
                                ">

                                    <div className="
                                        w-8
                                        h-8
                                        shrink-0
                                        rounded-lg
                                        bg-emerald-100
                                        flex
                                        items-center
                                        justify-center
                                        text-emerald-600
                                    ">

                                        <CheckCircle2
                                            size={17}
                                            strokeWidth={2}
                                        />

                                    </div>


                                    <div>

                                        <p className="
                                            text-sm
                                            font-semibold
                                            text-emerald-800
                                        ">

                                            Resume uploaded successfully

                                        </p>


                                        <p className="
                                            text-xs
                                            leading-5
                                            text-emerald-700
                                            mt-0.5
                                        ">

                                            Your resume has been saved
                                            and is ready for analysis.

                                        </p>

                                    </div>

                                </div>

                            </div>

                        )}

                    </div>

                </section>




            </div>

        </div>
    );
};


export default ResumeUpload;