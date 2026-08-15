import { useNavigate } from "react-router";


const Navbar = () => {

    const navigate =
        useNavigate();


    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate(
            "/login",
            { replace: true }
        );
    };


    return (

        <header className="h-16 bg-white border-b flex items-center justify-between px-6">

            <div>
                <h2 className="text-lg font-semibold">
                    Dashboard
                </h2>
            </div>


            <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-black"
            >
                Logout
            </button>

        </header>

    );
};


export default Navbar;