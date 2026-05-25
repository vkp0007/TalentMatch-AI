import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import {

    AuthProvider

} from "./context/AuthContext";

import {

    Toaster

} from "react-hot-toast";



ReactDOM.createRoot(

    document.getElementById("root")

).render(

    <React.StrictMode>

        <AuthProvider>

            <App />


            {/* ================================================= */}
            {/* TOASTER */}
            {/* ================================================= */}

            <Toaster

                position="top-right"

                toastOptions={{

                    duration: 4000,

                    style: {

                        background: "#FFFFFF",

                        color: "#0F172A",

                        border:
                            "1px solid #E2E8F0",

                        padding: "16px",

                        borderRadius: "18px",

                        boxShadow:
                            "0 1px 3px rgba(0,0,0,0.06)"
                    },


                    success: {

                        iconTheme: {

                            primary: "#0F172A",

                            secondary: "#FFFFFF"
                        }
                    },


                    error: {

                        iconTheme: {

                            primary: "#EF4444",

                            secondary: "#FFFFFF"
                        }
                    }
                }}
            />

        </AuthProvider>

    </React.StrictMode>
);