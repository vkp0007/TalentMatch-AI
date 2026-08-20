import {
    NavLink,
    Link,
    useNavigate
} from "react-router";

import {
    Menu,
    LayoutDashboard,
    FileText,
    PlusCircle,
    Mail,
    MessageSquare,
    LogOut,
    User,
    Sparkles
} from "lucide-react";


const Sidebar = ({
    open,
    onToggle
}) => {

    const navigate =
        useNavigate();


    const navigation = [

        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard
        },

        {
            name: "New Analysis",
            path: "/analysis/new",
            icon: PlusCircle
        },

        {
            name: "Referral Draft",
            path: "/referral-draft",
            icon: FileText
        },

        {
            name: "Application Email",
            path: "/application-email",
            icon: Mail
        },

        {
            name: "Interview Coach",
            path: "/interview",
            icon: MessageSquare
        }

    ];


    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate(
            "/login",
            {
                replace: true
            }
        );
    };


    return (

        <aside
            className={`
                fixed
                inset-y-0
                left-0
                z-50
                flex
                flex-col
                h-screen
                bg-white
                border-r
                border-[#E8E2D7]
                transition-all
                duration-200
                ${
                    open
                        ? "w-64"
                        : "w-16"
                }
            `}
        >


{/* =================================================
    BRAND / TOP
================================================= */}

<div className="
    h-16
    shrink-0
    flex
    items-center
    border-b
    border-[#E8E2D7]
    px-3
">

    <button
        type="button"
        onClick={onToggle}
        aria-label={
            open
                ? "Collapse sidebar"
                : "Expand sidebar"
        }
        className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            text-gray-500
            hover:bg-[#F7F3EA]
            hover:text-gray-900
            transition-all
        "
    >
        <Menu
            size={19}
            strokeWidth={1.8}
        />
    </button>


    {open && (

        <Link
            to="/"
            className="
                group
                flex
                items-center
                gap-2.5
                ml-3
                min-w-0
            "
            title="Go to TalentMatch AI"
        >

            <div className="
                w-8
                h-8
                shrink-0
                rounded-lg
                bg-gray-900
                text-white
                flex
                items-center
                justify-center
                group-hover:bg-gray-800
                group-hover:shadow-sm
                transition-all
            ">

                <Sparkles
                    size={14}
                    strokeWidth={1.8}
                />

            </div>


            <div className="
                min-w-0
            ">

                <p className="
                    text-sm
                    font-semibold
                    tracking-tight
                    text-gray-900
                    truncate
                ">
                    TalentMatch AI
                </p>

                <p className="
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.12em]
                    text-gray-400
                    mt-0.5
                ">
                    Career Intelligence
                </p>

            </div>

        </Link>

    )}

</div>

            {/* =================================================
                NAVIGATION
            ================================================= */}

            <nav className="
                flex-1
                overflow-y-auto
                px-2.5
                py-5
                space-y-1
            ">

                {navigation.map(
                    item => {

                        const Icon =
                            item.icon;


                        return (

                            <NavLink
                                key={
                                    item.path
                                }
                                to={
                                    item.path
                                }
                                title={
                                    open
                                        ? undefined
                                        : item.name
                                }
                                className={({
                                    isActive
                                }) => `
                                    group
                                    relative
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-3
                                    py-2.5
                                    text-sm
                                    font-medium
                                    transition-all
                                    duration-200
                                    ${
                                        isActive
                                            ? `
                                                bg-[#F7F3EA]
                                                text-gray-900
                                            `
                                            : `
                                                text-gray-500
                                                hover:bg-[#F7F3EA]/70
                                                hover:text-gray-900
                                            `
                                    }
                                `}
                            >

                                {({
                                    isActive
                                }) => (

                                    <>

                                        {/* ACTIVE INDICATOR */}

                                        {isActive && (

                                            <span className="
                                                absolute
                                                left-0
                                                top-1/2
                                                -translate-y-1/2
                                                w-0.5
                                                h-5
                                                rounded-full
                                                bg-gray-900
                                            " />

                                        )}


                                        <Icon
                                            size={18}
                                            strokeWidth={
                                                isActive
                                                    ? 2
                                                    : 1.8
                                            }
                                            className="
                                                shrink-0
                                            "
                                        />


                                        {open && (

                                            <span className="
                                                truncate
                                                whitespace-nowrap
                                            ">
                                                {item.name}
                                            </span>

                                        )}

                                    </>

                                )}

                            </NavLink>

                        );

                    }
                )}

            </nav>


            {/* =================================================
                ACCOUNT
            ================================================= */}

            <div className="
                shrink-0
                border-t
                border-[#E8E2D7]
                p-2.5
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-2.5
                    py-2.5
                    mb-1
                ">

                    <div className="
                        h-9
                        w-9
                        shrink-0
                        rounded-xl
                        bg-[#F7F3EA]
                        border
                        border-[#E8E2D7]
                        flex
                        items-center
                        justify-center
                        text-gray-600
                    ">

                        <User
                            size={16}
                            strokeWidth={1.8}
                        />

                    </div>


                    {open && (

                        <div className="
                            min-w-0
                        ">

                            <p className="
                                text-sm
                                font-medium
                                text-gray-900
                                truncate
                            ">
                                Account
                            </p>

                            <p className="
                                text-[11px]
                                text-gray-400
                                mt-0.5
                            ">
                                Profile
                            </p>

                        </div>

                    )}

                </div>


                {/* =================================================
                    LOGOUT
                ================================================= */}

                <button
                    type="button"
                    onClick={
                        handleLogout
                    }
                    title={
                        open
                            ? undefined
                            : "Logout"
                    }
                    className="
                        group
                        w-full
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        px-2.5
                        py-2.5
                        text-sm
                        font-medium
                        text-gray-500
                        hover:bg-red-50
                        hover:text-red-600
                        transition-all
                    "
                >

                    <LogOut
                        size={18}
                        strokeWidth={1.8}
                        className="
                            shrink-0
                        "
                    />


                    {open && (

                        <span>
                            Logout
                        </span>

                    )}

                </button>

            </div>

        </aside>
    );
};


export default Sidebar;