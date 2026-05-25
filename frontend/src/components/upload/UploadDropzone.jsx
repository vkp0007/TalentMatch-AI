import {
    UploadCloud
} from "lucide-react";


const UploadDropzone = ({
    resumeFile,
    handleFileChange
}) => {

    return (

        <div>

            <label className="block text-sm font-medium text-slate-700 mb-4">
                Resume File
            </label>


            <label
                className="

                border-2
                border-dashed
                border-slate-300
                hover:border-slate-400
                transition-all
                duration-300
                rounded-3xl
                p-14
                flex
                flex-col
                items-center
                justify-center
                cursor-pointer
                bg-slate-50

                "
            >

                {/* ICON */}

                <div className="bg-white border border-slate-200 p-5 rounded-3xl mb-6">

                    <UploadCloud
                        size={42}
                        className="text-slate-700"
                    />

                </div>


                {/* TITLE */}

                <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                    Upload Resume
                </h3>


                {/* DESCRIPTION */}

                <p className="text-slate-500 text-center mb-6">
                    Drag & drop your PDF or DOCX resume here
                </p>


                {/* BUTTON */}

                <span
                    className="

                    bg-slate-900
                    hover:bg-slate-800
                    text-white
                    transition-all
                    duration-300
                    px-6
                    py-3
                    rounded-2xl
                    font-medium

                    "
                >
                    Choose File
                </span>


                {/* FILE NAME */}

                {
                    resumeFile && (

                        <div className="mt-6 text-slate-700 font-medium">

                            {resumeFile.name}

                        </div>
                    )
                }


                {/* HIDDEN INPUT */}

                <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                />

            </label>

        </div>
    );
};

export default UploadDropzone;