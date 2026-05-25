import {

    Navigate

} from "react-router";

import {

    useAuth

} from "../context/AuthContext";



const PublicRoute = ({

    children

}) => {

    const {

        user,
        loading

    } = useAuth();


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div
                className="

                min-h-screen
                bg-slate-50
                flex
                items-center
                justify-center
                px-6

                "
            >

                <div
                    className="

                    bg-white
                    border
                    border-slate-200
                    rounded-3xl
                    px-10
                    py-8
                    shadow-sm
                    text-center

                    "
                >

                    {/* Loader */}

                    <div
                        className="

                        w-10
                        h-10
                        border-4
                        border-slate-200
                        border-t-slate-900
                        rounded-full
                        animate-spin
                        mx-auto

                        "
                    />


                    {/* Text */}

                    <p
                        className="text-slate-500 mt-5 text-lg"
                    >
                        Loading...
                    </p>

                </div>

            </div>
        );
    }


    // =====================================================
    // ALREADY AUTHENTICATED
    // =====================================================

    if (user) {

        return (

            <Navigate
                to="/dashboard"
                replace
            />
        );
    }


    // =====================================================
    // PUBLIC PAGE
    // =====================================================

    return children;
};

export default PublicRoute;