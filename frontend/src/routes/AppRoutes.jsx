import {
    Routes,
    Route,
    Navigate
} from "react-router";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../components/layout/MainLayout";


// =====================================================
// PUBLIC PAGES
// =====================================================

import Landing
    from "../pages/landing/Landing";

import Login
    from "../pages/auth/Login";

import Register
    from "../pages/auth/Register";


// =====================================================
// DASHBOARD
// =====================================================

import Dashboard
    from "../pages/dashboard/Dashboard";


// =====================================================
// RESUME
// =====================================================

import Resumes
    from "../pages/resume/Resumes";

import ResumeUpload
    from "../pages/resume/ResumeUpload";

import ResumeDetails
    from "../pages/resume/ResumeDetails";


// =====================================================
// ANALYSIS
// =====================================================

import AnalysisResult
    from "../pages/analysis/AnalysisResult";

import NewAnalysis
    from "../pages/analysis/NewAnalysis";

import Analyses
    from "../pages/analysis/Analyses";


// =====================================================
// RECOMMENDATIONS
// =====================================================

import Recommendations
    from "../pages/recommendations/Recommendations";


// =====================================================
// REFERRAL
// =====================================================

import ReferralDraft
    from "../pages/refferal/ReferralDraft.jsx";

import ReferralDrafts
    from "../pages/refferal/ReferralDrafts.jsx";

import ReferralDraftDetails
    from "../pages/refferal/ReferralDraftDetails.jsx";


// =====================================================
// APPLICATION
// =====================================================

import ApplicationEmail
    from "../pages/application/ApplicationEmail";

import ManageDrafts
    from "../pages/drafts/ManageDrafts.jsx";

import DraftDetails
    from "../pages/drafts/DraftDetails.jsx";


// =====================================================
// INTERVIEW
// =====================================================

import InterviewCoach
    from "../pages/interview/InterviewCoach";


const AppRoutes = () => {

    return (

        <Routes>

            {/* =================================================
                PUBLIC ROUTES
            ================================================= */}

            <Route
                path="/"
                element={
                    <Landing />
                }
            />


            <Route
                path="/login"
                element={
                    <Login />
                }
            />


            <Route
                path="/register"
                element={
                    <Register />
                }
            />


            {/* =================================================
                PROTECTED ROUTES
            ================================================= */}

            <Route
                element={
                    <ProtectedRoute />
                }
            >

                <Route
                    element={
                        <MainLayout />
                    }
                >

                    {/* DASHBOARD */}

                    <Route
                        path="/dashboard"
                        element={
                            <Dashboard />
                        }
                    />


                    {/* ANALYSES */}

                    <Route
                        path="/analyses"
                        element={
                            <Analyses />
                        }
                    />


                    <Route
                        path="/analysis/new"
                        element={
                            <NewAnalysis />
                        }
                    />


                    <Route
                        path="/analysis/:analysisId"
                        element={
                            <AnalysisResult />
                        }
                    />


                    {/* RESUMES */}

                    <Route
                        path="/resumes"
                        element={
                            <Resumes />
                        }
                    />


                    <Route
                        path="/resumes/upload"
                        element={
                            <ResumeUpload />
                        }
                    />


                    <Route
                        path="/resumes/:resumeId"
                        element={
                            <ResumeDetails />
                        }
                    />


                    {/* RECOMMENDATIONS */}

                    <Route
                        path="/recommendations"
                        element={
                            <Recommendations />
                        }
                    />


                    <Route
                        path="/recommendations/:analysisId"
                        element={
                            <Recommendations />
                        }
                    />


                    {/* REFERRAL DRAFT */}

                    <Route
                        path="/referral-draft"
                        element={
                            <ReferralDraft />
                        }
                    />


                    <Route
                        path="/referral-drafts"
                        element={
                            <ReferralDrafts />
                        }
                    />


                    <Route
                        path="/referral-drafts/:draftId"
                        element={
                            <ReferralDraftDetails />
                        }
                    />


                    {/* APPLICATION EMAIL */}

                    <Route
                        path="/application-email"
                        element={
                            <ApplicationEmail />
                        }
                    />


                    {/* SAVED DRAFTS */}

                    <Route
                        path="/drafts"
                        element={
                            <ManageDrafts />
                        }
                    />


                    <Route
                        path="/drafts/:draftId"
                        element={
                            <DraftDetails />
                        }
                    />


                    {/* INTERVIEW COACH */}

                    <Route
                        path="/interview"
                        element={
                            <InterviewCoach />
                        }
                    />

                </Route>

            </Route>


            {/* =================================================
                FALLBACK
            ================================================= */}

            <Route
                path="*"
                element={
                    <Navigate
                        to="/"
                        replace
                    />
                }
            />

        </Routes>
    );
};


export default AppRoutes;