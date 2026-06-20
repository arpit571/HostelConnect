import { Outlet } from "react-router-dom";
import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout() {

    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    return (

        <div className="min-h-screen bg-gray-100 flex">

            <Sidebar

                sidebarOpen={sidebarOpen}

                setSidebarOpen={setSidebarOpen}

            />

            <div className="flex-1 flex flex-col">

                <Navbar

                    setSidebarOpen={setSidebarOpen}

                />

                <main
                    className="
                        flex-1
                        p-4
                        md:p-6
                        lg:p-8
                        overflow-auto
                    "
                >

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default Layout;