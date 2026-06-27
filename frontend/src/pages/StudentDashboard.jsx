import { useState, useEffect } from "react";

import api from "../services/api";

import StatCard from "../components/dashboard/StatCard";

import {
    ClipboardDocumentListIcon,
    ClockIcon,
    CheckCircleIcon
} from "@heroicons/react/24/outline";

function StudentDashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

const response = await api.get("/dashboard/student");

                setDashboard(response.data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchDashboard();

    }, []);

    if (loading) {

        return <h1>Loading...</h1>;

    }

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">

                Student Dashboard

            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                <StatCard
                    title="My Complaints"
                    value={dashboard?.myComplaints ?? 0}
                    color="bg-blue-600"
                    icon={
                        <ClipboardDocumentListIcon className="w-7 h-7" />
                    }
                />

                <StatCard
                    title="Pending"
                    value={dashboard?.pending ?? 0}
                    color="bg-yellow-500"
                    icon={
                        <ClockIcon className="w-7 h-7" />
                    }
                />

                <StatCard
                    title="Resolved"
                    value={dashboard?.resolved ?? 0}
                    color="bg-green-600"
                    icon={
                        <CheckCircleIcon className="w-7 h-7" />
                    }
                />

            </div>

        </div>

    );

}

export default StudentDashboard;