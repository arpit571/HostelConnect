import { useState, useEffect } from "react";
import api from "../services/api";
import ComplaintCard from "../components/dashboard/ComplaintCard";

function Complaints() {

    // Data State
    const [complaints, setComplaints] = useState([]);

    // Loading State
    const [loading, setLoading] = useState(true);

    // Form State
    const [title, setTitle] = useState("");

    // UI State
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const role = localStorage.getItem("role");

    useEffect(() => {

        const fetchComplaints = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await api.get(
                    "/complaints",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setComplaints(response.data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchComplaints();

    }, []);

    const handleAddComplaint = async () => {

        if (!title.trim()) {

            setMessage("");
            setError("Complaint title cannot be empty.");

            return;

        }

        try {

            const token = localStorage.getItem("token");

            const response = await api.post(
                "/complaints",
                {
                    title
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setComplaints([
                ...complaints,
                response.data
            ]);

            setTitle("");

            setMessage("Complaint Added Successfully");

            setError("");

        } catch (error) {

            setMessage("");

            setError(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };

    const handleStatusChange = async (id, status) => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await api.put(
                    `/complaints/${id}/status`,
                    {
                        status
                    },
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setComplaints(

                complaints.map(

                    (complaint) =>

                        complaint._id === id

                            ? response.data

                            : complaint

                )

            );

        } catch (error) {

            setMessage("");

            setError(

                error.response?.data?.message ||

                "Something went wrong."

            );

        }

    };

    const handleDeleteComplaint = async (id) => {

        try {

            if (

                !window.confirm(

                    "Are you sure you want to delete this complaint?"

                )

            ) {

                return;

            }

            const token =
                localStorage.getItem("token");

            await api.delete(

                `/complaints/${id}`,

                {

                    headers: {

                        Authorization:

                            `Bearer ${token}`

                    }

                }

            );

            setComplaints(

                complaints.filter(

                    (complaint) =>

                        complaint._id !== id

                )

            );

            setMessage(

                "Complaint deleted successfully"

            );

            setError("");

        } catch (error) {

            setMessage("");

            setError(

                error.response?.data?.message ||

                "Something went wrong"

            );

        }

    };

    if (loading) {

        return (

            <h1 className="text-2xl font-bold">

                Loading...

            </h1>

        );

    }

    return (

        <div>

            {/* Page Heading */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-gray-800">

                    Complaints

                </h1>

                <p className="text-gray-500 mt-2">

                    Raise and track hostel complaints.

                </p>

            </div>

            {/* Success Message */}

            {

                message && (

                    <div className="bg-green-100 text-green-700 border border-green-300 rounded-xl p-4 mb-6">

                        {message}

                    </div>

                )

            }

            {/* Error Message */}

            {

                error && (

                    <div className="bg-red-100 text-red-700 border border-red-300 rounded-xl p-4 mb-6">

                        {error}

                    </div>

                )

            }

            {/* Complaint Form */}

            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

                <h2 className="text-xl font-semibold mb-4">

                    Create Complaint

                </h2>

                <input

                    type="text"

                    placeholder="Enter Complaint"

                    value={title}

                    onChange={(e) =>

                        setTitle(e.target.value)

                    }

                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"

                />

                <button

                    onClick={handleAddComplaint}

                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all"

                >

                    Add Complaint

                </button>

            </div>

            {/* Complaint List */}

            {

                complaints.length === 0

                    ?

                    (

                        <div className="bg-white rounded-2xl shadow-md p-10 text-center">

                            <h2 className="text-2xl font-semibold">

                                No Complaints Yet

                            </h2>

                            <p className="text-gray-500 mt-3">

                                Create your first complaint.

                            </p>

                        </div>

                    )

                    :

                    (

                        <div className="space-y-5">

                            {

                                complaints.map(

                                    (complaint) => (

                                        <ComplaintCard

                                            key={complaint._id}

                                            complaint={complaint}

                                            role={role}

                                            onStatusChange={handleStatusChange}

                                            onDelete={handleDeleteComplaint}

                                        />

                                    )

                                )

                            }

                        </div>

                    )

            }

        </div>

    );

}

export default Complaints;