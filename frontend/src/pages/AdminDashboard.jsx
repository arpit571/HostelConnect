import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import StatCard from "../components/StatCard";

import {
    ClipboardDocumentListIcon,
    ClockIcon,
    CheckCircleIcon,
    UsersIcon,
    MegaphoneIcon,
    ArrowPathIcon,
    DocumentTextIcon
} from "@heroicons/react/24/outline";

function AdminDashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [noticeLoading, setNoticeLoading] = useState(false);

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good Morning ☀️"
            : hour < 18
            ? "Good Afternoon 🌤️"
            : "Good Evening 🌙";

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const response =
                    await api.get(
                        "/dashboard",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setDashboard(
                    response.data
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchDashboard();

    }, []);

    const handleCreateNotice = async () => {

        if (
            !title.trim() ||
            !description.trim()
        ) {

            setMessage("");

            setError(
                "All fields are required."
            );

            return;

        }

        try {

            setNoticeLoading(true);

            setError("");

            const token =
                localStorage.getItem("token");

            await api.post(

                "/notices",

                {
                    title,
                    description
                },

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );

            setMessage(
                "Notice Created Successfully"
            );

            setTitle("");

            setDescription("");

        } catch (error) {

            setMessage("");

            setError(

                error.response?.data?.message ||

                "Something went wrong"

            );

        } finally {

            setNoticeLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-64">

                <p className="text-xl font-semibold text-gray-500">

                    Loading Dashboard...

                </p>

            </div>

        );

    }

    return (

        <div>

            {/* Welcome Banner */}

            <div
                className="
                    bg-gradient-to-r
                    from-blue-600
                    to-indigo-700
                    rounded-2xl
                    p-8
                    text-white
                    mb-8
                "
            >

                <h1 className="text-4xl font-bold">

                    {greeting}

                </h1>

                <p className="mt-3 text-blue-100">

                    Hostel is operating normally.

                    {

                        dashboard.pendingComplaints > 0

                            ? ` ${dashboard.pendingComplaints} complaint(s) need attention.`

                            : " No pending complaints."

                    }

                </p>

            </div>

            {/* Dashboard Cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">

                <StatCard
                    title="Total Complaints"
                    value={dashboard.totalComplaints}
                    color="bg-blue-600"
                    icon={
                        <ClipboardDocumentListIcon className="w-7 h-7" />
                    }
                />

                <StatCard
                    title="Pending"
                    value={dashboard.pendingComplaints}
                    color="bg-yellow-500"
                    icon={
                        <ClockIcon className="w-7 h-7" />
                    }
                />

                <StatCard
                    title="Resolved"
                    value={dashboard.resolvedComplaints}
                    color="bg-green-600"
                    icon={
                        <CheckCircleIcon className="w-7 h-7" />
                    }
                />

                <StatCard
                    title="In Progress"
                    value={dashboard.inProgressComplaints}
                    color="bg-orange-500"
                    icon={
                        <ArrowPathIcon className="w-7 h-7" />
                    }
                />

                <StatCard
                    title="Students"
                    value={dashboard.totalStudents}
                    color="bg-purple-600"
                    icon={
                        <UsersIcon className="w-7 h-7" />
                    }
                />

                <StatCard
                    title="Notices"
                    value={dashboard.totalNotices}
                    color="bg-pink-600"
                    icon={
                        <MegaphoneIcon className="w-7 h-7" />
                    }
                />

            </div>

            {/* Quick Actions */}

            <div className="mb-10">

                <h2 className="text-2xl font-semibold mb-5">

                    Quick Actions

                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    <button

                        onClick={() =>

                            document
                                .getElementById("notice-form")
                                .scrollIntoView({

                                    behavior: "smooth"

                                })

                        }

                        className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            rounded-xl
                            p-5
                            transition-all
                            duration-300
                            flex
                            flex-col
                            items-center
                            gap-3
                        "

                    >

                        <MegaphoneIcon className="w-8 h-8" />

                        Create Notice

                    </button>

                    <button

                        onClick={() =>

                            navigate("/complaints")

                        }

                        className="
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            rounded-xl
                            p-5
                            transition-all
                            duration-300
                            flex
                            flex-col
                            items-center
                            gap-3
                        "

                    >

                        <ClipboardDocumentListIcon className="w-8 h-8" />

                        View Complaints

                    </button>

                    <button

                        onClick={() =>

                            navigate("/notices")

                        }

                        className="
                            bg-purple-600
                            hover:bg-purple-700
                            text-white
                            rounded-xl
                            p-5
                            transition-all
                            duration-300
                            flex
                            flex-col
                            items-center
                            gap-3
                        "

                    >

                        <DocumentTextIcon className="w-8 h-8" />

                        View Notices

                    </button>

                </div>

            </div>

            {/* Messages */}

            {

                message && (

                    <div className="mb-4 p-4 rounded-xl bg-green-100 text-green-700">

                        {message}

                    </div>

                )

            }

            {

                error && (

                    <div className="mb-6 p-4 rounded-xl bg-red-100 text-red-700">

                        {error}

                    </div>

                )

            }

                        {/* Create Notice */}

            <div
                id="notice-form"
                className="bg-white rounded-2xl shadow-md p-8"
            >

                <h2 className="text-2xl font-semibold text-gray-800 mb-6">

                    Create New Notice

                </h2>

                <div className="space-y-5">

                    <div>

                        <label className="block text-gray-700 font-medium mb-2">

                            Notice Title

                        </label>

                        <input

                            type="text"

                            placeholder="Enter notice title"

                            value={title}

                            onChange={(e) =>
                                setTitle(e.target.value)
                            }

                            className="
                                w-full
                                border
                                border-gray-300
                                rounded-xl
                                p-3
                                outline-none
                                focus:ring-2
                                focus:ring-blue-500
                                focus:border-blue-500
                            "

                        />

                    </div>

                    <div>

                        <label className="block text-gray-700 font-medium mb-2">

                            Description

                        </label>

                        <textarea

                            rows="5"

                            placeholder="Enter notice description..."

                            value={description}

                            onChange={(e) =>
                                setDescription(e.target.value)
                            }

                            className="
                                w-full
                                border
                                border-gray-300
                                rounded-xl
                                p-3
                                outline-none
                                focus:ring-2
                                focus:ring-blue-500
                                focus:border-blue-500
                            "

                        />

                    </div>

                    <button

                        onClick={handleCreateNotice}

                        disabled={noticeLoading}

                        className="
                            bg-blue-600
                            hover:bg-blue-700
                            disabled:bg-gray-400
                            disabled:cursor-not-allowed
                            text-white
                            px-8
                            py-3
                            rounded-xl
                            font-semibold
                            transition-all
                            duration-300
                        "

                    >

                        {

                            noticeLoading

                                ? "Creating..."

                                : "Create Notice"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;