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

        <div className="bg-white border border-slate-200 rounded-3xl p-8">

            <UploadError error={error} />

            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >

                <UploadDropzone
                    resumeFile={resumeFile}
                    handleFileChange={handleFileChange}
                />

                <ResumeNameInput
                    resumeName={resumeName}
                    setResumeName={setResumeName}
                />

                <UploadButton
                    loading={loading}
                />

            </form>

        </div>
    );
};

export default UploadForm;