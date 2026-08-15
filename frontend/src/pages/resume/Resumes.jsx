import { useEffect, useState } from "react";
import {
    useNavigate
} from "react-router";
import {
    getResumes,
    uploadResume,
    deleteResume
} from "../../api/resume.api";


const Resumes = () => {

    const [resumes, setResumes] = useState([]);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [resumeName, setResumeName] = useState("");
    const [targetRole, setTargetRole] = useState("");


    const loadResumes = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await getResumes();

            setResumes(
                response.data?.data || []
            );

        } catch (error) {

            console.error(
                "Failed to load resumes:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load resumes"
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadResumes();

    }, []);


    const handleFileChange = (event) => {

        const selectedFile =
            event.target.files?.[0];

        setFile(
            selectedFile || null
        );

        setError("");
    };


const handleUpload = async () => {

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
        setError("");


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


        await uploadResume(
            formData
        );


        setResumeName("");
        setTargetRole("");
        setFile(null);


        await loadResumes();


    } catch (error) {

        console.error(
            "Resume upload failed:",
            error
        );


        setError(
            error.response?.data?.message ||
            "Failed to upload resume"
        );


    } finally {

        setUploading(false);
    }
};


    const handleDelete = async (
        resumeId
    ) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this resume?"
            );

        if (!confirmed) {
            return;
        }


        try {

            setError("");

            await deleteResume(
                resumeId
            );

            setResumes(
                (current) =>
                    current.filter(
                        (resume) =>
                            resume._id !== resumeId
                    )
            );

        } catch (error) {

            console.error(
                "Resume deletion failed:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to delete resume"
            );

        }
    };


    return (

 <div className="max-w-5xl mx-auto">

    {/* ================================================= */}
    {/* HEADER */}
    {/* ================================================= */}

    <div className="mb-8">

        <h1 className="text-2xl font-bold">
            Resumes
        </h1>

        <p className="mt-2 text-gray-600">
            Upload and manage your resumes.
        </p>

    </div>


    {/* ================================================= */}
    {/* UPLOAD RESUME */}
    {/* ================================================= */}

    <div className="bg-white border rounded-xl p-6 mb-8">

        <h2 className="text-lg font-semibold mb-1">
            Upload Resume
        </h2>

        <p className="text-sm text-gray-500 mb-6">
            Add your resume and specify the role you're targeting.
        </p>


        {/* Resume Name */}

        <div className="mb-4">

            <label
                htmlFor="resumeName"
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                Resume Name
            </label>

            <input
                id="resumeName"
                type="text"
                value={resumeName}
                onChange={(event) =>
                    setResumeName(event.target.value)
                }
                placeholder="e.g. Software Engineer Resume"
                disabled={uploading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-100"
            />

        </div>


        {/* Target Role */}

        <div className="mb-4">

            <label
                htmlFor="targetRole"
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                Target Role
            </label>

            <input
                id="targetRole"
                type="text"
                value={targetRole}
                onChange={(event) =>
                    setTargetRole(event.target.value)
                }
                placeholder="e.g. Software Engineer"
                disabled={uploading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-100"
            />

        </div>


        {/* File */}

        <div className="mb-5">

            <label
                htmlFor="resumeFile"
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                Resume File
            </label>

            <input
                id="resumeFile"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                disabled={uploading}
                className="block w-full text-sm text-gray-600"
            />

        </div>


        {/* Selected File */}

        {file && (

            <div className="mb-5 p-3 rounded-lg bg-gray-50 border">

                <p className="text-sm text-gray-700">
                    <span className="font-medium">
                        Selected:
                    </span>{" "}
                    {file.name}
                </p>

            </div>

        )}


        {/* Upload Button */}

        <button
            type="button"
            onClick={handleUpload}
            disabled={
                uploading ||
                !file ||
                !resumeName.trim() ||
                !targetRole.trim()
            }
            className="px-5 py-2.5 rounded-lg bg-black text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition"
        >
            {uploading
                ? "Uploading..."
                : "Upload Resume"}
        </button>

    </div>


    {/* ================================================= */}
    {/* ERROR */}
    {/* ================================================= */}

    {error && (

        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
            {error}
        </div>

    )}


    {/* ================================================= */}
    {/* RESUME LIST */}
    {/* ================================================= */}

    <div>

        <div className="flex items-center justify-between mb-4">

            <div>

                <h2 className="text-lg font-semibold">
                    My Resumes
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Your uploaded resumes and target roles.
                </p>

            </div>

        </div>


        {loading ? (

            <div className="bg-white border rounded-xl p-8 text-center">

                <p className="text-gray-500">
                    Loading resumes...
                </p>

            </div>

        ) : resumes.length === 0 ? (

            <div className="bg-white border rounded-xl p-8 text-center">

                <p className="text-gray-500">
                    No resumes uploaded yet.
                </p>

                <p className="text-sm text-gray-400 mt-1">
                    Upload your first resume to get started.
                </p>

            </div>

        ) : (

            <div className="space-y-3">

                {resumes.map(
                    (resume) => (

                        <div
                            key={resume._id}
                            className="bg-white border rounded-xl p-5 flex items-center justify-between gap-6"
                        >

                            {/* Resume information */}

                            <div className="min-w-0">

                                <h3 className="font-medium text-gray-900 truncate">
                                    {resume.resumeName ||
                                        resume.fileName ||
                                        resume.name ||
                                        "Resume"}
                                </h3>


                                {resume.targetRole && (

                                    <p className="text-sm text-gray-600 mt-1">
                                        Target role:{" "}
                                        <span className="font-medium">
                                            {resume.targetRole}
                                        </span>
                                    </p>

                                )}


                                {resume.createdAt && (

                                    <p className="text-xs text-gray-400 mt-2">
                                        Uploaded{" "}
                                        {new Date(
                                            resume.createdAt
                                        ).toLocaleDateString()}
                                    </p>

                                )}

                            </div>


                            {/* Actions */}

                            <div className="flex items-center gap-4 shrink-0">
                                   <div className="flex items-center gap-4 shrink-0">

    <button
        type="button"
        onClick={() =>
            navigate(
                `/resumes/${resume._id}`
            )
        }
        className="text-sm font-medium text-black hover:underline"
    >
        View
    </button>

    <button
        type="button"
        onClick={() =>
            handleDelete(resume._id)
        }
        className="text-sm text-red-600 hover:text-red-700"
    >
        Delete
    </button>

</div>


                            </div>

                        </div>

                    )
                )}

            </div>

        )}

    </div>

</div>
    );
};


export default Resumes;