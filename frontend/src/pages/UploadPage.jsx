import {
    useState
} from "react";

import {
    useNavigate
} from "react-router";

import DashboardLayout
from "../components/layout/DashboardLayout";

import Topbar
from "../components/layout/Topbar";

import UploadForm
from "../components/upload/UploadForm";

import {
    uploadResume
} from "../api/resumeApi";


const UploadPage = () => {

    const navigate =
        useNavigate();


    // =====================================================
    // STATE
    // =====================================================

    const [
        resumeFile,
        setResumeFile
    ] = useState(null);


    const [
        resumeName,
        setResumeName
    ] = useState("");


    const [
        loading,
        setLoading
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    // =====================================================
    // FILE CHANGE
    // =====================================================

    const handleFileChange = (e) => {

        setResumeFile(
            e.target.files[0]
        );
    };


    // =====================================================
    // UPLOAD
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        if (!resumeFile) {

            return setError(
                "Please upload a resume"
            );
        }


        try {

            setLoading(true);


            const formData =
                new FormData();


            formData.append(
                "resume",
                resumeFile
            );

            formData.append(
                "resumeName",
                resumeName
            );


            await uploadResume(
                formData
            );


            navigate("/dashboard");

        } catch(error) {

            setError(

                error.response?.data
                    ?.message ||

                "Resume upload failed"
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <DashboardLayout>

            <Topbar

                title="Upload Resume"

                subtitle="Upload resumes for AI-powered ATS analysis"

            />


            <div className="max-w-4xl">

                <UploadForm

                    handleSubmit={handleSubmit}

                    resumeFile={resumeFile}

                    handleFileChange={handleFileChange}

                    resumeName={resumeName}

                    setResumeName={setResumeName}

                    loading={loading}

                    error={error}
                />

            </div>

        </DashboardLayout>
    );
};

export default UploadPage;