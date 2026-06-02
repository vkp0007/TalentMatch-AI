import {
    useEffect,
    useState
} from "react";

import DashboardLayout
    from "../components/layout/DashboardLayout";

import Topbar
    from "../components/layout/Topbar";

import ResumeSection
    from "../components/dashboard/ResumeSection";

import AnalysisSection
    from "../components/dashboard/AnalysisSection";

import LoadingState
    from "../components/dashboard/LoadingState";

import ErrorState
    from "../components/dashboard/ErrorState";

import {
    getUserResumes
} from "../api/resumeApi.js";

import {
    getUserAnalyses
} from "../api/analysisApi.js";


const DashboardPage = () => {

    const [resumes, setResumes] = useState([]);

    const [analyses, setAnalyses] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        fetchDashboardData();

    }, []);


    const fetchDashboardData = async () => {

        try {

            setLoading(true);

            const [
                resumeResponse,
                analysisResponse
            ] = await Promise.all([

                getUserResumes(),

                getUserAnalyses()
            ]);


            setResumes(
                resumeResponse.data || []
            );

            setAnalyses(
                analysisResponse.analyses || []
            );

        } catch (error) {

            console.log(error);

            setError(

                error.response?.data?.message ||

                "Failed to load dashboard"
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <DashboardLayout>

            <Topbar
                title="Dashboard"
                subtitle="Manage resumes and ATS analysis reports"
            />

            {loading && <LoadingState />}

            {error && <ErrorState error={error} />}

            {
                !loading
                &&
                !error
                &&
                (
                    <div
                        className="

            grid
            grid-cols-1
            xl:grid-cols-2
            gap-8

            "
                    >

                        <ResumeSection
                            resumes={resumes.slice(0, 3)}
                            compact={true}
                        />

                        <AnalysisSection
                            analyses={analyses.slice(0, 3)}
                            compact={true}
                        />

                    </div>
                )
            }

        </DashboardLayout>
    );
};

export default DashboardPage;