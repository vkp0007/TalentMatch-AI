import {
    NavLink
} from "react-router";


const Sidebar = () => {

    const navigation = [

        {
            name: "Dashboard",
            path: "/dashboard"
        },

        {
            name: "Resumes",
            path: "/resumes"
        },

        {
            name: "Analysis",
            path: "/analysis"
        },

        {
            name: "Application Email",
            path: "/application-email"
        },

        {
            name: "Interview Coach",
            path: "/interview"
        }

    ];


    return (

        <aside className="w-64 min-h-screen bg-white border-r">

            <div className="px-6 py-5">

                <h1 className="text-xl font-bold">
                    TalentMatch AI
                </h1>

            </div>


            <nav className="px-3 space-y-1">

                {navigation.map((item) => (

                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `block px-4 py-3 rounded-lg text-sm font-medium transition ${
                                isActive
                                    ? "bg-gray-100 text-black"
                                    : "text-gray-600 hover:bg-gray-50"
                            }`
                        }
                    >
                        {item.name}
                    </NavLink>

                ))}

            </nav>

        </aside>

    );
};


export default Sidebar;