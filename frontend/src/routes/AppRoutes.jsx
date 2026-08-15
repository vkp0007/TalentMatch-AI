import {
    Routes,
    Route,
    Navigate
} from "react-router";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../components/layout/MainLayout";


import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Resumes from "../pages/resume/Resumes";
import ResumeDetails from "../pages/resume/ResumeDetails";
import Analysis from "../pages/analysis/Analysis";
import Recommendations from "../pages/recommendations/Recommendations";
import ApplicationEmail from "../pages/application/ApplicationEmail";
import InterviewCoach from "../pages/interview/InterviewCoach";





const AppRoutes = () => {

    return (

        <Routes>

            {/* Public routes */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />


            {/* Protected routes */}

            <Route element={<ProtectedRoute />}>

                <Route
                    element={<MainLayout />}
                >

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/resumes"
                        element={<Resumes />}
                    />
                    <Route
    path="/resumes/:resumeId"
    element={<ResumeDetails />}
/>

                    <Route
                        path="/analysis"
                        element={<Analysis />}
                    />

                    <Route
                        path="/recommendations"
                        element={<Recommendations />}
                    />

                    <Route
                        path="/application-email"
                        element={<ApplicationEmail />}
                    />

                    <Route
                        path="/interview"
                        element={<InterviewCoach />}
                    />

                </Route>

            </Route>


            {/* Default */}

            <Route
                path="/"
                element={
                    <Navigate
                        to="/dashboard"
                        replace
                    />
                }
            />


            <Route
                path="*"
                element={
                    <Navigate
                        to="/dashboard"
                        replace
                    />
                }
            />

        </Routes>

    );
};


export default AppRoutes;