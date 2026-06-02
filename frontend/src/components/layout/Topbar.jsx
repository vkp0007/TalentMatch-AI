import {

    LogOut

} from "lucide-react";

import {

    useNavigate

} from "react-router";

import {

    useAuth

} from "../../context/AuthContext";



const Topbar = ({

    title,
    subtitle

}) => {

    const {

        user,
        logout

    } = useAuth();


    const navigate =
        useNavigate();


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {

        logout();

        navigate("/login");
    };


    return (

        <header
            className="flex items-center justify-between mb-6"
        >

            {/* LEFT */}

            <div>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    {title}
                </h1>

                <p
                    className="text-slate-500 mt-3 text-lg"
                >
                    {subtitle}
                </p>

            </div>


            {/* RIGHT */}

            <div
                className="flex items-center gap-4"
            >

                {/* Profile */}

                <div
                    className="

                    flex
                    items-center
                    gap-4
                    bg-white
                    border
                    border-slate-200
                    px-5
                    py-2
                    rounded-xl
                    shadow-sm

                    "
                >

                    {/* Avatar */}

                    <div
                        className="

                        w-11
                        h-11
                        rounded-full
                        bg-slate-900
                        text-white
                        flex
                        items-center
                        justify-center
                        font-semibold

                        "
                    >

                        {

                            user?.name?.charAt(0)
                        }

                    </div>


                    {/* User Info */}

                    <div>

                        <p
                            className="font-medium text-slate-900"
                        >
                            {user?.name}
                        </p>

                        

                    </div>

                </div>


                {/* Logout */}

                <button
                    onClick={handleLogout}
                    className="

                    w-12
                    h-12
                    rounded-2xl
                    bg-white
                    border
                    border-slate-200
                    flex
                    items-center
                    justify-center
                    text-slate-600
                    hover:bg-red-50
                    hover:text-red-500
                    transition-all
                    duration-300

                    "
                >

                    <LogOut size={18} />

                </button>

            </div>

        </header>
    );
};

export default Topbar;