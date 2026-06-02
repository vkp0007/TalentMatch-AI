import { UploadCloud } from "lucide-react";

const UploadDropzone = ({
    resumeFile,
    handleFileChange
}) => {

    return (

        <div>

            <label className="block text-sm font-medium text-slate-700 mb-3">
                Resume File
            </label>

            <label
                className="

                border-2
                border-dashed
                border-slate-300
                hover:border-slate-400
                rounded-2xl
                p-5
                flex
                flex-col
                items-center
                cursor-pointer
                bg-slate-50
                transition-all

                "
            >

                <UploadCloud
                    size={24}
                    className="text-slate-700 mb-3"
                />

                <h3
                    className="

                    text-base
                    font-semibold
                    text-slate-900

                    "
                >
                    Upload Resume
                </h3>

                <p
                    className="

                    text-sm
                    text-slate-500
                    mt-1

                    "
                >
                    PDF or DOCX
                </p>

                {
                    resumeFile && (

                        <p
                            className="

                            mt-3
                            text-sm
                            font-medium
                            text-slate-700

                            "
                        >
                            {resumeFile.name}
                        </p>
                    )
                }

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