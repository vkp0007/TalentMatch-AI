import {

    BrowserRouter,
    Routes,
    Route,
    Navigate

} from "react-router";

import LoginPage
from "./pages/LoginPage";

import RegisterPage
from "./pages/RegisterPage";

import DashboardPage
from "./pages/DashboardPage";

import UploadPage
from "./pages/UploadPage";

import AnalysisPage
from "./pages/AnalysisPage";

import ReportsPage
from "./pages/ReportsPage";

import ReportDetailsPage
from "./pages/ReportDetailsPage";


import ProtectedRoute
from "./routes/ProtectedRoute";

import PublicRoute
from "./routes/PublicRoute";



function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* ================================================= */}
                {/* ROOT REDIRECT */}
                {/* ================================================= */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />


                {/* ================================================= */}
                {/* PUBLIC ROUTES */}
                {/* ================================================= */}

                <Route
                    path="/login"
                    element={

                        <PublicRoute>

                            <LoginPage />

                        </PublicRoute>
                    }
                />


                <Route
                    path="/register"
                    element={

                        <PublicRoute>

                            <RegisterPage />

                        </PublicRoute>
                    }
                />


                {/* ================================================= */}
                {/* PROTECTED ROUTES */}
                {/* ================================================= */}

                <Route
                    path="/dashboard"
                    element={

                        <ProtectedRoute>

                            <DashboardPage />

                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/upload"
                    element={

                        <ProtectedRoute>

                            <UploadPage />

                        </ProtectedRoute>
                    }
                />


                {/* ================================================= */}
                {/* RUN NEW ANALYSIS */}
                {/* ================================================= */}

                <Route
                    path="/analysis/:resumeId"
                    element={

                        <ProtectedRoute>

                            <AnalysisPage />

                        </ProtectedRoute>
                    }
                />


                {/* ================================================= */}
                {/* REPORTS */}
                {/* ================================================= */}

                <Route
                    path="/reports"
                    element={

                        <ProtectedRoute>

                            <ReportsPage />

                        </ProtectedRoute>
                    }
                />


                {/* ================================================= */}
                {/* REPORT DETAILS */}
                {/* ================================================= */}

                <Route
                    path="/reports/:analysisId"
                    element={

                        <ProtectedRoute>

                            <ReportDetailsPage />

                        </ProtectedRoute>
                    }
                />


                {/* ================================================= */}
                {/* FALLBACK ROUTE */}
                {/* ================================================= */}

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

        </BrowserRouter>
    );
}

export default App;