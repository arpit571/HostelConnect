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
    const [description, setDescription] = useState("");

    // UI State
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const role = localStorage.getItem("role");

    // Fetch complaints
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

                setError(
                    error.response?.data?.message ||
                    "Failed to load complaints."
                );

            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    // Create complaint
    const handleAddComplaint = async () => {
        if (!title.trim()) {
            setMessage("");
            setError("Complaint title cannot be empty.");
            return;
        }

        if (!description.trim()) {
            setMessage("");
            setError("Complaint description cannot be empty.");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await api.post(
                "/complaints",
                {
                    title,
                    description
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
            setDescription("");

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

    // Update complaint status
    const handleStatusChange = async (id, status) => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.patch(
                `/complaints/${id}/status`,
                {
                    status,
                    note: `Status changed to ${status.replace(
                        "_",
                        " "
                    )}`
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setComplaints(
                complaints.map(
                    (complaint) =>
                        complaint._id === id
                            ? response.data.complaint
                            : complaint
                )
            );

            setMessage(
                "Complaint status updated successfully"
            );

            setError("");

        } catch (error) {
            setMessage("");

            setError(
                error.response?.data?.message ||
                "Something went wrong."
            );
        }
    };

    // Delete complaint
    const handleDeleteComplaint = async (id) => {
        try {
            if (
                !window.confirm(
                    "Are you sure you want to delete this complaint?"
                )
            ) {
                return;
            }

            const token = localStorage.getItem("token");

            await api.delete(
                `/complaints/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
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

    // Loading
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

            {message && (
                <div className="
                    bg-green-100
                    text-green-700
                    border
                    border-green-300
                    rounded-xl
                    p-4
                    mb-6
                ">
                    {message}
                </div>
            )}

            {/* Error Message */}

            {error && (
                <div className="
                    bg-red-100
                    text-red-700
                    border
                    border-red-300
                    rounded-xl
                    p-4
                    mb-6
                ">
                    {error}
                </div>
            )}

            {/* Complaint Form */}

            <div className="
                bg-white
                rounded-2xl
                shadow-md
                p-6
                mb-8
            ">

                <h2 className="
                    text-xl
                    font-semibold
                    mb-4
                ">
                    Create Complaint
                </h2>

                {/* Title */}

                <input
                    type="text"
                    placeholder="Enter Complaint Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    className="
                        w-full
                        border
                        rounded-lg
                        p-3
                        outline-none
                        focus:ring-2
                        focus:ring-blue-500
                    "
                />

                {/* Description */}

                <textarea
                    placeholder="Describe your complaint"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    rows="4"
                    className="
                        w-full
                        border
                        rounded-lg
                        p-3
                        mt-4
                        outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        resize-none
                    "
                />

                {/* Submit */}

                <button
                    onClick={handleAddComplaint}
                    className="
                        mt-4
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-6
                        py-3
                        rounded-lg
                        transition-all
                    "
                >
                    Add Complaint
                </button>

            </div>

            {/* Complaint List */}

            {complaints.length === 0 ? (

                <div className="
                    bg-white
                    rounded-2xl
                    shadow-md
                    p-10
                    text-center
                ">

                    <h2 className="
                        text-2xl
                        font-semibold
                    ">
                        No Complaints Yet
                    </h2>

                    <p className="
                        text-gray-500
                        mt-3
                    ">
                        Create your first complaint.
                    </p>

                </div>

            ) : (

                <div className="space-y-5">

                    {complaints.map(
                        (complaint) => (

                            <ComplaintCard
                                key={complaint._id}
                                complaint={complaint}
                                role={role}
                                onStatusChange={
                                    handleStatusChange
                                }
                                onDelete={
                                    handleDeleteComplaint
                                }
                            />

                        )
                    )}

                </div>

            )}

        </div>
    );
}

export default Complaints;