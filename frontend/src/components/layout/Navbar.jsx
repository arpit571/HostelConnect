import { useLocation } from "react-router-dom";

import {
    Bars3Icon,
    BellIcon,
    UserCircleIcon
} from "@heroicons/react/24/outline";

function Navbar({ setSidebarOpen }) {

    const location = useLocation();

    const role =
        localStorage.getItem("role");

    const pageTitle = {

        "/student":
            "Student Dashboard",

        "/admin":
            "Admin Dashboard",

        "/complaints":
            "Complaints",

        "/notices":
            "Notices"

    };

    return (

        <header
            className="
                bg-white
                shadow-sm
                px-4
                md:px-8
                py-4
                flex
                justify-between
                items-center
            "
        >

            <div
                className="
                    flex
                    items-center
                    gap-4
                "
            >

                <button
                    onClick={() =>
                        setSidebarOpen(true)
                    }
                    className="
                        lg:hidden
                    "
                >

                    <Bars3Icon
                        className="
                            w-8
                            h-8
                            text-gray-700
                        "
                    />

                </button>

                <div>

                    <h1
                        className="
                            text-xl
                            md:text-2xl
                            font-bold
                            text-gray-800
                        "
                    >

                        {
                            pageTitle[
                                location.pathname
                            ]
                        }

                    </h1>

                    <p
                        className="
                            hidden
                            md:block
                            text-sm
                            text-gray-500
                        "
                    >

                        Welcome back!

                    </p>

                </div>

            </div>

            <div
                className="
                    flex
                    items-center
                    gap-4
                    md:gap-6
                "
            >

                <BellIcon
                    className="
                        w-6
                        h-6
                        text-gray-600
                        cursor-pointer
                    "
                />

                <div
                    className="
                        flex
                        items-center
                        gap-2
                    "
                >

                    <UserCircleIcon
                        className="
                            w-9
                            h-9
                            text-blue-600
                        "
                    />

                    <span
                        className="
                            hidden
                            md:block
                            capitalize
                            font-medium
                        "
                    >

                        {role}

                    </span>

                </div>

            </div>

        </header>

    );

}

export default Navbar;