import Sidebar from "./Sidebar";



const DashboardLayout = ({

    children

}) => {

    return (

        <div
            className="flex min-h-screen bg-slate-50"
        >

            {/* ================================================= */}
            {/* SIDEBAR */}
            {/* ================================================= */}

            <Sidebar />


            {/* ================================================= */}
            {/* MAIN CONTENT */}
            {/* ================================================= */}

            <main
                className="flex-1 overflow-y-auto p-8 lg:p-10"
            >

                <div
                    className="max-w-7xl mx-auto"
                >

                    {children}

                </div>

            </main>

        </div>
    );
};

export default DashboardLayout;