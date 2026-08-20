import {
    useState
} from "react";

import {
    Outlet
} from "react-router";

import Sidebar
    from "./Sidebar";


const MainLayout = () => {

    const [
        sidebarOpen,
        setSidebarOpen
    ] = useState(true);


    return (

        <div className="
            min-h-screen
            bg-[#F7F3EA]
        ">

            {/* =================================================
                FIXED SIDEBAR
            ================================================= */}

            <Sidebar
                open={
                    sidebarOpen
                }
                onToggle={() =>
                    setSidebarOpen(
                        current =>
                            !current
                    )
                }
            />


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <main
                className={`
                    min-h-screen
                    transition-all
                    duration-200
                    ${
                        sidebarOpen
                            ? "ml-64"
                            : "ml-16"
                    }
                `}
            >

                <div className="
                    min-h-screen
                    px-5
                    py-6
                    sm:px-6
                    lg:px-8
                ">

                    <Outlet />

                </div>

            </main>

        </div>
    );
};


export default MainLayout;