import {

    LayoutDashboard,
    Upload,
    FileText

} from "lucide-react";

import {

    NavLink

} from "react-router";


const Sidebar = () => {

    // =====================================================
    // NAV ITEM STYLE
    // =====================================================

    const navItemClass =
        ({ isActive }) =>

            `

            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-2xl
            transition-all
            duration-300
            font-medium

            ${

                isActive

                ?

                "bg-slate-900 text-white shadow-sm"

                :

                "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }

            `;


    return (

        <aside
            className="

            w-72
            bg-white
            border-r
            border-slate-200
            min-h-screen
            p-6
            flex
            flex-col

            "
        >

            {/* ================================================= */}
            {/* LOGO */}
            {/* ================================================= */}

            <div
                className="mb-14"
            >

                <h1
                    className="text-3xl font-bold tracking-tight text-slate-900"
                >
                    TalentMatch
                </h1>

                <p
                    className="text-slate-500 mt-2 text-sm"
                >
                    AI Resume Intelligence
                </p>

            </div>


            {/* ================================================= */}
            {/* NAVIGATION */}
            {/* ================================================= */}

            <nav
                className="flex-1 space-y-3"
            >

                {/* Dashboard */}

                <NavLink
                    to="/dashboard"
                    className={navItemClass}
                >

                    <LayoutDashboard size={20} />

                    Dashboard

                </NavLink>


                {/* Upload Resume */}

                <NavLink
                    to="/upload"
                    className={navItemClass}
                >

                    <Upload size={20} />

                    Upload Resume

                </NavLink>


                {/* ATS Reports */}

                <NavLink
                    to="/reports"
                    className={navItemClass}
                >

                    <FileText size={20} />

                    ATS Reports

                </NavLink>

            </nav>

        </aside>
    );
};

export default Sidebar;