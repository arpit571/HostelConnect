const STATUS_STEPS = [
    {
        value: "submitted",
        label: "Submitted"
    },
    {
        value: "under_review",
        label: "Under Review"
    },
    {
        value: "in_progress",
        label: "In Progress"
    },
    {
        value: "resolved",
        label: "Resolved"
    },
    {
        value: "closed",
        label: "Closed"
    }
];

function formatDate(date) {
    if (!date) return "";

    return new Date(date).toLocaleString();
}

function ComplaintCard({
    complaint,
    role,
    onStatusChange,
    onDelete
}) {

    const currentStatusIndex = STATUS_STEPS.findIndex(
        (step) => step.value === complaint.status
    );

    const getStatusHistory = (status) => {
        return complaint.statusHistory?.find(
            (item) => item.status === status
        );
    };

    const badgeClass =
        complaint.status === "submitted"
            ? "bg-yellow-100 text-yellow-700"
            : complaint.status === "under_review"
            ? "bg-blue-100 text-blue-700"
            : complaint.status === "in_progress"
            ? "bg-purple-100 text-purple-700"
            : complaint.status === "resolved"
            ? "bg-green-100 text-green-700"
            : complaint.status === "closed"
            ? "bg-gray-100 text-gray-700"
            : "bg-gray-100 text-gray-700";

    return (
        <div
            className="
                bg-white
                rounded-2xl
                shadow-md
                p-6
                hover:shadow-xl
                transition-all
                duration-300
            "
        >

            {/* Complaint Header */}

            <div
                className="
                    flex
                    justify-between
                    items-start
                "
            >

                <div>

                    <h2
                        className="
                            text-xl
                            font-semibold
                            text-gray-800
                        "
                    >
                        {complaint.title}
                    </h2>

                    <p
                        className="
                            text-gray-400
                            text-sm
                            mt-1
                        "
                    >
                        Complaint ID
                    </p>

                    <p
                        className="
                            text-xs
                            text-gray-500
                        "
                    >
                        {complaint._id}
                    </p>

                </div>

                <span
                    className={`
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-medium
                        ${badgeClass}
                    `}
                >
                    {complaint.status
                        ?.replace("_", " ")
                        .replace(/\b\w/g, (char) =>
                            char.toUpperCase()
                        )}
                </span>

            </div>

            <hr className="my-5" />

            {/* Complaint Timeline */}

            <div>

                <h3
                    className="
                        text-lg
                        font-semibold
                        text-gray-800
                        mb-5
                    "
                >
                    Complaint Timeline
                </h3>

                <div className="space-y-5">

                    {STATUS_STEPS.map((step, index) => {

                        const history =
                            getStatusHistory(step.value);

                        const isCompleted =
                            index <= currentStatusIndex;

                        const isCurrent =
                            step.value === complaint.status;

                        return (
                            <div
                                key={step.value}
                                className="
                                    flex
                                    items-start
                                "
                            >

                                {/* Timeline Icon */}

                                <div className="flex flex-col items-center mr-4">

                                    <div
                                        className={`
                                            w-8
                                            h-8
                                            rounded-full
                                            flex
                                            items-center
                                            justify-center
                                            text-sm
                                            font-bold
                                            ${
                                                isCompleted
                                                    ? "bg-green-500 text-white"
                                                    : "bg-gray-200 text-gray-500"
                                            }
                                        `}
                                    >
                                        {isCompleted ? "✓" : index + 1}
                                    </div>

                                    {index <
                                        STATUS_STEPS.length - 1 && (
                                        <div
                                            className={`
                                                w-0.5
                                                h-10
                                                ${
                                                    index <
                                                    currentStatusIndex
                                                        ? "bg-green-500"
                                                        : "bg-gray-200"
                                                }
                                            `}
                                        />
                                    )}

                                </div>

                                {/* Timeline Content */}

                                <div className="flex-1">

                                    <div
                                        className={`
                                            font-semibold
                                            ${
                                                isCurrent
                                                    ? "text-green-600"
                                                    : isCompleted
                                                    ? "text-gray-800"
                                                    : "text-gray-400"
                                            }
                                        `}
                                    >
                                        {step.label}
                                    </div>

                                    {history && (
                                        <div className="mt-1">

                                            {history.note && (
                                                <p
                                                    className="
                                                        text-sm
                                                        text-gray-500
                                                    "
                                                >
                                                    {history.note}
                                                </p>
                                            )}

                                            <p
                                                className="
                                                    text-xs
                                                    text-gray-400
                                                    mt-1
                                                "
                                            >
                                                {formatDate(
                                                    history.changedAt
                                                )}
                                            </p>

                                        </div>
                                    )}

                                    {isCurrent && !history && (
                                        <p
                                            className="
                                                text-sm
                                                text-gray-500
                                                mt-1
                                            "
                                        >
                                            Current status
                                        </p>
                                    )}

                                </div>

                            </div>
                        );

                    })}

                </div>

            </div>

            {/* Admin Controls */}

            {role === "admin" && (
                <>
                    <hr className="my-6" />

                    <div
                        className="
                            flex
                            justify-between
                            items-center
                            gap-4
                        "
                    >

                        <select
                            value={complaint.status}
                            onChange={(e) =>
                                onStatusChange(
                                    complaint._id,
                                    e.target.value
                                )
                            }
                            className="
                                border
                                rounded-lg
                                p-2
                                flex-1
                            "
                        >

                            {STATUS_STEPS.map((step) => (
                                <option
                                    key={step.value}
                                    value={step.value}
                                >
                                    {step.label}
                                </option>
                            ))}

                        </select>

                        <button
                            onClick={() =>
                                onDelete(complaint._id)
                            }
                            className="
                                bg-red-600
                                hover:bg-red-700
                                text-white
                                px-5
                                py-2
                                rounded-lg
                                transition-all
                            "
                        >
                            Delete
                        </button>

                    </div>
                </>
            )}

        </div>
    );
}

export default ComplaintCard;