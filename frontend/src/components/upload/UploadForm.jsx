import UploadDropzone from "./UploadDropzone";
import ResumeNameInput from "./ResumeNameInput";
import UploadButton from "./UploadButton";
import UploadError from "./UploadError";


const UploadForm = ({
    handleSubmit,
    resumeFile,
    handleFileChange,
    resumeName,
    setResumeName,
    loading,
    error
}) => {

    return (

        <div
            className="

            bg-white
            border
            border-slate-200
            rounded-3xl
            p-6

            "
        >

            <UploadError error={error} />

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* Upload Area */}

                <UploadDropzone
                    resumeFile={resumeFile}
                    handleFileChange={handleFileChange}
                />


                {/* Resume Name */}

                <ResumeNameInput
                    resumeName={resumeName}
                    setResumeName={setResumeName}
                />


                {/* Upload Button */}

                <div className="pt-2">

                    <UploadButton
                        loading={loading}
                    />

                </div>

            </form>

        </div>
    );
};

export default UploadForm;