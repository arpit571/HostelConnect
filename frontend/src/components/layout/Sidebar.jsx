import {
    HomeIcon,
    ClipboardDocumentListIcon,
    MegaphoneIcon,
    UserCircleIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";

import { NavLink } from "react-router-dom";

import LogoutButton from "./LogoutButton";

function Sidebar({

    sidebarOpen,

    setSidebarOpen

}) {

    const role = localStorage.getItem("role");

    const linkClass = ({ isActive }) =>

        `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:translate-x-1 ${
            isActive
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
        }`;

    return (

        <>

            {/* Mobile Overlay */}

            {

                sidebarOpen && (

                    <div

                        className="
                            fixed
                            inset-0
                            bg-black/50
                            z-40
                            lg:hidden
                        "

                        onClick={() =>
                            setSidebarOpen(false)
                        }

                    />

                )

            }

            {/* Sidebar */}

            <aside

                className={`

                    fixed

                    lg:static

                    top-0

                    left-0

                    h-screen

                    w-64

                    bg-gray-900

                    flex

                    flex-col

                    justify-between

                    z-50

                    transform

                    transition-transform

                    duration-300

                    ${

                        sidebarOpen

                            ? "translate-x-0"

                            : "-translate-x-full lg:translate-x-0"

                    }

                `}

            >

                {/* Top */}

                <div>

                    {/* Header */}

                    <div className="p-6 flex justify-between items-center">

                        <div>

                            <h1 className="text-3xl font-bold text-white">

                                HostelConnect

                            </h1>

                            <p className="text-gray-400 text-sm mt-2">

                                Hostel Management System

                            </p>

                        </div>

                        {/* Close Button */}

                        <button

                            className="lg:hidden text-white"

                            onClick={() =>
                                setSidebarOpen(false)
                            }

                        >

                            <XMarkIcon className="w-7 h-7" />

                        </button>

                    </div>

                    <hr className="border-gray-700" />

                    {/* Navigation */}

                    <div className="px-6 mt-6">

                        <p className="text-xs uppercase text-gray-500 mb-3">

                            Main Menu

                        </p>

                        <nav className="flex flex-col gap-2">

                            <NavLink

                                to={
                                    role === "admin"

                                        ? "/admin"

                                        : "/student"
                                }

                                className={linkClass}

                                onClick={() =>
                                    setSidebarOpen(false)
                                }

                            >

                                <HomeIcon className="w-6 h-6" />

                                Dashboard

                            </NavLink>

                            <NavLink

                                to="/complaints"

                                className={linkClass}

                                onClick={() =>
                                    setSidebarOpen(false)
                                }

                            >

                                <ClipboardDocumentListIcon className="w-6 h-6" />

                                Complaints

                            </NavLink>

                            <NavLink

                                to="/notices"

                                className={linkClass}

                                onClick={() =>
                                    setSidebarOpen(false)
                                }

                            >

                                <MegaphoneIcon className="w-6 h-6" />

                                Notices

                            </NavLink>

                        </nav>

                    </div>

                </div>

                {/* Bottom */}

                <div className="p-6">

                    <p className="text-xs uppercase text-gray-500 mb-3">

                        Account

                    </p>

                    <div className="flex items-center gap-3 text-gray-300 mb-4">

                        <UserCircleIcon className="w-7 h-7" />

                        <span className="capitalize">

                            {role}

                        </span>

                    </div>

                    <LogoutButton />

                    <p className="text-center text-xs text-gray-500 mt-8">

                        Version 1.0

                    </p>

                </div>

            </aside>

        </>

    );

}

export default Sidebar;