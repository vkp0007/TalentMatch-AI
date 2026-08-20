import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router";

import {
    getResume,
    deleteResume
} from "../../api/resume.api.js";

import ResumeHeader
    from "../../components/resume/ResumeHeader";

import CandidateInfo
    from "../../components/resume/CandidateInfo";

import SkillsSection
    from "../../components/resume/SkillsSection";

import ToolsSection
    from "../../components/resume/ToolsSection";

import ProjectsSection
    from "../../components/resume/ProjectsSection";

import EducationSection
    from "../../components/resume/EducationSection";

import ExperienceSection
    from "../../components/resume/ExperienceSection";

import ListSection
    from "../../components/resume/ListSection";

import LoadingState
    from "../../components/dashboard/LoadingState";

import ErrorState
    from "../../components/dashboard/ErrorState";


const ResumeDetails = () => {

    const {
        resumeId
    } = useParams();


    const navigate =
        useNavigate();


    // =====================================================
    // STATE
    // =====================================================

    const [resume, setResume] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [deleting, setDeleting] =
        useState(false);


    // =====================================================
    // LOAD RESUME
    // =====================================================

    const loadResume = async () => {

        try {

            setLoading(true);
            setError("");


            const response =
                await getResume(
                    resumeId
                );


            setResume(
                response?.data?.data ||
                null
            );


        } catch (error) {

            console.error(
                "Failed to load resume:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to load resume."
            );


        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // DELETE RESUME
    // =====================================================

    const handleDelete = async () => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this resume?"
            );


        if (!confirmed) {
            return;
        }


        try {

            setDeleting(true);
            setError("");


            await deleteResume(
                resumeId
            );


            navigate(
                "/resumes",
                {
                    replace: true
                }
            );


        } catch (error) {

            console.error(
                "Failed to delete resume:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to delete resume."
            );


        } finally {

            setDeleting(false);

        }
    };


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        if (resumeId) {

            loadResume();

        }

    }, [resumeId]);


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="
                min-h-screen
                bg-[#FDFBF7]
                max-w-6xl
                mx-auto
                px-5
                sm:px-6
                py-8
            ">

                <LoadingState />

            </div>
        );
    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error && !resume) {

        return (

            <div className="
                min-h-screen
                bg-[#FDFBF7]
                max-w-6xl
                mx-auto
                px-5
                sm:px-6
                py-8
            ">

                <ErrorState
                    message={error}
                    onRetry={loadResume}
                />

            </div>
        );
    }


    // =====================================================
    // NOT FOUND
    // =====================================================

    if (!resume) {

        return (

            <div className="
                min-h-screen
                bg-[#FDFBF7]
                max-w-6xl
                mx-auto
                px-5
                sm:px-6
                py-8
            ">

                <ErrorState
                    message="Resume not found."
                    onRetry={() =>
                        navigate(
                            "/resumes"
                        )
                    }
                />

            </div>
        );
    }


    // =====================================================
    // PARSED DATA
    // =====================================================

    const parsedData =
        resume.parsedData || {};


    const candidateInfo =
        parsedData.candidateInfo || {};


    const technicalSkills =
        parsedData.technicalSkills || [];


    const tools =
        parsedData.tools || [];


    const projects =
        parsedData.projects || [];


    const education =
        parsedData.education || [];


    const experience =
        parsedData.experience || [];


    const certifications =
        parsedData.certifications || [];


    const achievements =
        parsedData.achievements || [];


    const training =
        parsedData.training || [];


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="
            min-h-screen
            bg-[#FDFBF7]
        ">

            <div className="
                max-w-6xl
                mx-auto
                px-5
                sm:px-6
                py-7
                sm:py-9
                pb-16
            ">

                {/* =================================================
                    HEADER
                ================================================= */}

                <ResumeHeader

                    resumeName={
                        resume.resumeName
                    }

                    targetRole={
                        resume.targetRole
                    }

                    resumeId={
                        resume._id
                    }

                    onDelete={
                        handleDelete
                    }

                    deleting={
                        deleting
                    }

                />


                {/* =================================================
                    DELETE ERROR
                ================================================= */}

                {error && (

                    <div className="
                        mt-5
                        mb-6
                        rounded-2xl
                        border
                        border-red-200
                        bg-red-50
                        px-5
                        py-4
                        text-sm
                        leading-5
                        text-red-700
                        shadow-sm
                    ">

                        {error}

                    </div>

                )}




                {/* =================================================
                    RESUME CONTENT
                ================================================= */}

                <div className="
                    space-y-5
                ">

                    {/* CANDIDATE INFORMATION */}

                    <CandidateInfo
                        candidateInfo={
                            candidateInfo
                        }
                    />


                    {/* CORE SKILLS */}

                    <SkillsSection
                        technicalSkills={
                            technicalSkills
                        }
                    />


                    {/* TOOLS */}

                    <ToolsSection
                        tools={
                            tools
                        }
                    />


                    {/* PROJECTS */}

                    <ProjectsSection
                        projects={
                            projects
                        }
                    />


                    {/* EDUCATION */}

                    <EducationSection
                        education={
                            education
                        }
                    />


                    {/* EXPERIENCE */}

                    <ExperienceSection
                        experience={
                            experience
                        }
                    />


                    {/* =================================================
                        ADDITIONAL INFORMATION
                    ================================================= */}

                    <div className="
                        space-y-5
                    ">

                        <ListSection
                            title="Certifications"
                            items={
                                certifications
                            }
                            emptyText="No certifications listed."
                            hideWhenEmpty
                            variant="primary"
                        />


                        <ListSection
                            title="Achievements"
                            items={
                                achievements
                            }
                            emptyText="No achievements listed."
                            variant="success"
                        />


                        <ListSection
                            title="Training"
                            items={
                                training
                            }
                            emptyText="No training listed."
                            hideWhenEmpty
                            variant="neutral"
                        />

                    </div>

                </div>

            </div>

        </div>
    );
};


export default ResumeDetails;