import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router";

import {
    getResume
} from "../../api/resume.api.js";


const ResumeDetails = () => {

    const { resumeId } = useParams();

    const navigate = useNavigate();


    const [resume, setResume] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        const loadResume = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await getResume(resumeId);

                setResume(
                    response?.data?.data
                );

            } catch (error) {

                console.error(
                    "Failed to load resume:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load resume"
                );

            } finally {

                setLoading(false);
            }
        };


        loadResume();

    }, [resumeId]);


    if (loading) {

        return (
            <div className="max-w-5xl mx-auto">

                <p className="text-gray-500">
                    Loading resume...
                </p>

            </div>
        );
    }


    if (error || !resume) {

        return (
            <div className="max-w-5xl mx-auto">

                <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-red-700">
                    {error || "Resume not found."}
                </div>

            </div>
        );
    }


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


    return (

        <div className="max-w-5xl mx-auto pb-10">


            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="flex items-start justify-between mb-8">

                <div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/resumes")
                        }
                        className="text-sm text-gray-500 hover:text-black mb-3"
                    >
                        ← Back to Resumes
                    </button>


                    <h1 className="text-2xl font-bold">
                        {resume.resumeName}
                    </h1>


                    <p className="text-gray-600 mt-1">

                        Target Role:{" "}

                        <span className="font-medium">
                            {resume.targetRole}
                        </span>

                    </p>

                </div>


                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            `/analysis?resumeId=${resume._id}`
                        )
                    }
                    className="px-5 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
                >
                    Analyze Job Description
                </button>

            </div>


            {/* ================================================= */}
            {/* CANDIDATE INFORMATION */}
            {/* ================================================= */}

            <section className="bg-white border rounded-xl p-6 mb-6">

                <h2 className="text-lg font-semibold mb-5">
                    Candidate Information
                </h2>


                <div className="grid md:grid-cols-2 gap-5">

                    <Info
                        label="Name"
                        value={
                            candidateInfo.name
                        }
                    />

                    <Info
                        label="Email"
                        value={
                            candidateInfo.email
                        }
                    />

                    <Info
                        label="Phone"
                        value={
                            candidateInfo.phone
                        }
                    />

                    <Info
                        label="LinkedIn"
                        value={
                            candidateInfo.linkedin
                        }
                    />

                    <Info
                        label="GitHub"
                        value={
                            candidateInfo.github
                        }
                    />

                </div>

            </section>


            {/* ================================================= */}
            {/* TECHNICAL SKILLS */}
            {/* ================================================= */}

            <section className="bg-white border rounded-xl p-6 mb-6">

                <h2 className="text-lg font-semibold mb-4">
                    Technical Skills
                </h2>


                {technicalSkills.length > 0 ? (

                    <div className="flex flex-wrap gap-2">

                        {technicalSkills.map(
                            (skill, index) => (

                                <span
                                    key={index}
                                    className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700"
                                >
                                    {skill}
                                </span>

                            )
                        )}

                    </div>

                ) : (

                    <Empty
                        text="No technical skills listed."
                    />

                )}

            </section>


            {/* ================================================= */}
            {/* TOOLS */}
            {/* ================================================= */}

            <section className="bg-white border rounded-xl p-6 mb-6">

                <h2 className="text-lg font-semibold mb-4">
                    Tools & Platforms
                </h2>


                {tools.length > 0 ? (

                    <div className="flex flex-wrap gap-2">

                        {tools.map(
                            (tool, index) => (

                                <span
                                    key={index}
                                    className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700"
                                >
                                    {tool}
                                </span>

                            )
                        )}

                    </div>

                ) : (

                    <Empty
                        text="No tools listed."
                    />

                )}

            </section>


            {/* ================================================= */}
            {/* PROJECTS */}
            {/* ================================================= */}

            <section className="bg-white border rounded-xl p-6 mb-6">

                <h2 className="text-lg font-semibold mb-5">
                    Projects
                </h2>


                {projects.length === 0 ? (

                    <Empty
                        text="No projects listed."
                    />

                ) : (

                    <div className="space-y-6">

                        {projects.map(
                            (project, index) => (

                                <Project
                                    key={index}
                                    project={project}
                                />

                            )
                        )}

                    </div>

                )}

            </section>


            {/* ================================================= */}
            {/* EDUCATION */}
            {/* ================================================= */}

            <section className="bg-white border rounded-xl p-6 mb-6">

                <h2 className="text-lg font-semibold mb-5">
                    Education
                </h2>


                {education.length === 0 ? (

                    <Empty
                        text="No education information listed."
                    />

                ) : (

                    <div className="space-y-5">

                        {education.map(
                            (item, index) => (

                                <div
                                    key={index}
                                    className="border-b last:border-0 pb-5 last:pb-0"
                                >

                                    <h3 className="font-medium text-gray-900">
                                        {item.degree}
                                    </h3>


                                    {item.institution && (

                                        <p className="text-gray-600 text-sm mt-1">
                                            {item.institution}
                                        </p>

                                    )}


                                    {item.year && (

                                        <p className="text-gray-500 text-sm mt-1">
                                            {item.year}
                                        </p>

                                    )}

                                </div>

                            )
                        )}

                    </div>

                )}

            </section>


            {/* ================================================= */}
            {/* EXPERIENCE */}
            {/* ================================================= */}

            <section className="bg-white border rounded-xl p-6 mb-6">

                <h2 className="text-lg font-semibold mb-5">
                    Experience
                </h2>


                {experience.length === 0 ? (

                    <Empty
                        text="No professional experience listed."
                    />

                ) : (

                    <div className="space-y-5">

                        {experience.map(
                            (item, index) => (

                                <div
                                    key={index}
                                    className="border-b last:border-0 pb-5 last:pb-0"
                                >

                                    <h3 className="font-medium">
                                        {item.role ||
                                            item.position ||
                                            "Experience"}
                                    </h3>


                                    {item.company && (

                                        <p className="text-gray-600 text-sm mt-1">
                                            {item.company}
                                        </p>

                                    )}

                                </div>

                            )
                        )}

                    </div>

                )}

            </section>


            {/* ================================================= */}
            {/* CERTIFICATIONS */}
            {/* ================================================= */}

            {certifications.length > 0 && (

                <section className="bg-white border rounded-xl p-6 mb-6">

                    <h2 className="text-lg font-semibold mb-4">
                        Certifications
                    </h2>


                    <List
                        items={certifications}
                    />

                </section>

            )}


            {/* ================================================= */}
            {/* ACHIEVEMENTS */}
            {/* ================================================= */}

            <section className="bg-white border rounded-xl p-6 mb-6">

                <h2 className="text-lg font-semibold mb-4">
                    Achievements
                </h2>


                {achievements.length > 0 ? (

                    <List
                        items={achievements}
                    />

                ) : (

                    <Empty
                        text="No achievements listed."
                    />

                )}

            </section>


            {/* ================================================= */}
            {/* TRAINING */}
            {/* ================================================= */}

            {training.length > 0 && (

                <section className="bg-white border rounded-xl p-6">

                    <h2 className="text-lg font-semibold mb-4">
                        Training
                    </h2>


                    <List
                        items={training}
                    />

                </section>

            )}

        </div>
    );
};


// =====================================================
// INFO
// =====================================================

const Info = ({
    label,
    value
}) => (

    <div>

        <p className="text-sm text-gray-500">
            {label}
        </p>

        <p className="mt-1 font-medium break-all">
            {value || "Not provided"}
        </p>

    </div>

);


// =====================================================
// PROJECT
// =====================================================

const Project = ({
    project
}) => {

    return (

        <div className="border-b last:border-0 pb-6 last:pb-0">

            <h3 className="font-semibold text-gray-900">
                {project.name}
            </h3>


            {project.technologies?.length > 0 && (

                <div className="flex flex-wrap gap-2 mt-3">

                    {project.technologies.map(
                        (technology, index) => (

                            <span
                                key={index}
                                className="px-2.5 py-1 bg-gray-100 rounded-md text-xs text-gray-600"
                            >
                                {technology}
                            </span>

                        )
                    )}

                </div>

            )}


            {project.description && (

                <p className="text-gray-700 text-sm mt-3">
                    {project.description}
                </p>

            )}


            {project.responsibilities?.length > 0 && (

                <ul className="mt-3 space-y-1">

                    {project.responsibilities.map(
                        (item, index) => (

                            <li
                                key={index}
                                className="text-sm text-gray-700"
                            >
                                • {item}
                            </li>

                        )
                    )}

                </ul>

            )}

        </div>

    );
};


// =====================================================
// LIST
// =====================================================

const List = ({
    items
}) => (

    <ul className="space-y-2">

        {items.map(
            (item, index) => (

                <li
                    key={index}
                    className="text-gray-700 text-sm"
                >
                    • {item}
                </li>

            )
        )}

    </ul>

);


// =====================================================
// EMPTY
// =====================================================

const Empty = ({
    text
}) => (

    <p className="text-gray-500 text-sm">
        {text}
    </p>

);


export default ResumeDetails;