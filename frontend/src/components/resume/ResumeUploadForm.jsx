import {
    X,
    FileText,
    Upload,
    CheckCircle2
} from "lucide-react";


const ResumeUploadForm = ({
    resumeName,
    targetRole,
    file,
    uploading,
    onResumeNameChange,
    onTargetRoleChange,
    onFileChange,
    onRemoveFile,
    onUpload
}) => {

    return (

        <div className="
            w-full
            rounded-2xl
            bg-[#F7F3EA]
            border
            border-[#E8E2D7]
            p-6
            sm:p-7
            shadow-sm
        ">

            {/* =================================================
                FORM INTRO
            ================================================= */}

            <div className="
                mb-7
                pb-5
                border-b
                border-[#E8E2D7]
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <div className="
                        w-10
                        h-10
                        shrink-0
                        rounded-xl
                        bg-white
                        border
                        border-[#E8E2D7]
                        flex
                        items-center
                        justify-center
                        text-gray-600
                    ">

                        <FileText
                            size={18}
                            strokeWidth={1.8}
                        />

                    </div>


                    <div>

                        <h2 className="
                            text-base
                            font-semibold
                            tracking-tight
                            text-gray-900
                        ">
                            Add your resume
                        </h2>

                        <p className="
                            text-xs
                            text-gray-500
                            mt-0.5
                        ">
                            Upload your resume to begin your analysis.
                        </p>

                    </div>

                </div>

            </div>


            {/* =================================================
                RESUME NAME
            ================================================= */}

            <div className="mb-5">

                <label
                    htmlFor="resumeName"
                    className="
                        flex
                        items-center
                        justify-between
                        gap-3
                        mb-2
                        text-sm
                        font-medium
                        text-gray-800
                    "
                >

                    <span>
                        Resume Name
                    </span>

                    <span className="
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-wider
                        text-gray-400
                    ">
                        Required
                    </span>

                </label>


                <input
                    id="resumeName"
                    type="text"
                    value={resumeName}
                    onChange={
                        onResumeNameChange
                    }
                    placeholder="e.g. Software Engineer Resume"
                    disabled={uploading}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-[#DED7CB]
                        bg-white
                        px-4
                        py-3
                        text-sm
                        text-gray-900
                        placeholder:text-gray-400
                        outline-none
                        shadow-sm
                        transition-all
                        duration-200
                        hover:border-[#CFC6B8]
                        focus:border-gray-400
                        focus:ring-4
                        focus:ring-[#EDE7DC]
                        disabled:bg-gray-100
                        disabled:cursor-not-allowed
                    "
                />

            </div>


            {/* =================================================
                TARGET ROLE
            ================================================= */}

            <div className="mb-6">

                <label
                    htmlFor="targetRole"
                    className="
                        flex
                        items-center
                        justify-between
                        gap-3
                        mb-2
                        text-sm
                        font-medium
                        text-gray-800
                    "
                >

                    <span>
                        Target Role
                    </span>

                    <span className="
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-wider
                        text-gray-400
                    ">
                        Required
                    </span>

                </label>


                <input
                    id="targetRole"
                    type="text"
                    value={targetRole}
                    onChange={
                        onTargetRoleChange
                    }
                    placeholder="e.g. Software Engineer"
                    disabled={uploading}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-[#DED7CB]
                        bg-white
                        px-4
                        py-3
                        text-sm
                        text-gray-900
                        placeholder:text-gray-400
                        outline-none
                        shadow-sm
                        transition-all
                        duration-200
                        hover:border-[#CFC6B8]
                        focus:border-gray-400
                        focus:ring-4
                        focus:ring-[#EDE7DC]
                        disabled:bg-gray-100
                        disabled:cursor-not-allowed
                    "
                />

            </div>


            {/* =================================================
                RESUME FILE
            ================================================= */}

            <div className="mb-6">

                <div className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    mb-2
                ">

                    <label
                        htmlFor="resumeFile"
                        className="
                            text-sm
                            font-medium
                            text-gray-800
                        "
                    >
                        Resume File
                    </label>


                    <span className="
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-wider
                        text-gray-400
                    ">
                        PDF · DOC · DOCX
                    </span>

                </div>


                {!file ? (

                    <div className="
                        group
                        relative
                        rounded-2xl
                        border-2
                        border-dashed
                        border-[#DCD4C6]
                        bg-white/70
                        px-5
                        py-7
                        text-center
                        transition-all
                        duration-200
                        hover:border-[#BEB4A3]
                        hover:bg-white
                    ">

                        <div className="
                            w-11
                            h-11
                            mx-auto
                            rounded-xl
                            bg-[#F7F3EA]
                            border
                            border-[#E8E2D7]
                            flex
                            items-center
                            justify-center
                            text-gray-500
                            transition-all
                            duration-200
                            group-hover:bg-white
                            group-hover:shadow-sm
                        ">

                            <Upload
                                size={19}
                                strokeWidth={1.8}
                            />

                        </div>


                        <p className="
                            mt-3
                            text-sm
                            font-medium
                            text-gray-800
                        ">
                            Choose your resume
                        </p>


                        <p className="
                            mt-1
                            text-xs
                            text-gray-400
                        ">
                            Select a PDF, DOC, or DOCX file
                        </p>


                        <input
                            id="resumeFile"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={
                                onFileChange
                            }
                            disabled={uploading}
                            className="
                                mt-4
                                block
                                w-full
                                text-xs
                                text-gray-500
                                file:mr-3
                                file:rounded-lg
                                file:border-0
                                file:bg-gray-900
                                file:px-3.5
                                file:py-2
                                file:text-xs
                                file:font-medium
                                file:text-white
                                file:cursor-pointer
                                hover:file:bg-gray-800
                                transition
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        />

                    </div>

                ) : (

                    /* =================================================
                       SELECTED FILE
                    ================================================= */

                    <div className="
                        flex
                        items-center
                        gap-3
                        rounded-2xl
                        border
                        border-[#D8D0C3]
                        bg-white
                        px-4
                        py-3.5
                        shadow-sm
                    ">

                        <div className="
                            w-10
                            h-10
                            shrink-0
                            rounded-xl
                            bg-[#F7F3EA]
                            border
                            border-[#E8E2D7]
                            flex
                            items-center
                            justify-center
                            text-gray-600
                        ">

                            <FileText
                                size={18}
                                strokeWidth={1.8}
                            />

                        </div>


                        <div className="
                            min-w-0
                            flex-1
                        ">

                            <p className="
                                truncate
                                text-sm
                                font-medium
                                text-gray-800
                            ">
                                {file.name}
                            </p>


                            <div className="
                                flex
                                items-center
                                gap-1.5
                                mt-1
                            ">

                                <CheckCircle2
                                    size={12}
                                    className="text-emerald-600"
                                    strokeWidth={2}
                                />

                                <p className="
                                    text-xs
                                    text-gray-500
                                ">
                                    Resume selected
                                </p>

                            </div>

                        </div>


                        {/* REMOVE FILE */}

                        <button
                            type="button"
                            onClick={
                                onRemoveFile
                            }
                            disabled={uploading}
                            aria-label="Remove selected file"
                            title="Remove file"
                            className="
                                w-8
                                h-8
                                shrink-0
                                rounded-lg
                                flex
                                items-center
                                justify-center
                                text-gray-400
                                hover:bg-red-50
                                hover:text-red-600
                                transition-all
                                duration-200
                                disabled:opacity-40
                                disabled:cursor-not-allowed
                            "
                        >

                            <X
                                size={16}
                                strokeWidth={2}
                            />

                        </button>

                    </div>

                )}

            </div>


            {/* =================================================
                UPLOAD BUTTON
            ================================================= */}

            <button
                type="button"
                onClick={onUpload}
                disabled={
                    uploading ||
                    !file ||
                    !resumeName.trim() ||
                    !targetRole.trim()
                }
                className="
                    w-full
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-5
                    py-3
                    rounded-xl
                    bg-gray-900
                    text-white
                    text-sm
                    font-medium
                    shadow-sm
                    hover:bg-gray-800
                    hover:shadow-md
                    active:translate-y-px
                    transition-all
                    duration-200
                    disabled:bg-gray-300
                    disabled:text-gray-500
                    disabled:shadow-none
                    disabled:cursor-not-allowed
                "
            >

                {uploading ? (
                    <>
                        <span className="
                            w-4
                            h-4
                            rounded-full
                            border-2
                            border-white
                            border-t-transparent
                            animate-spin"
                        />

                        Uploading...
                    </>
                ) : (
                    <>
                        <Upload
                            size={16}
                            strokeWidth={1.9}
                        />

                        Upload Resume
                    </>
                )}

            </button>

        </div>
    );
};


export default ResumeUploadForm;