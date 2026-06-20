function ComplaintCard({

    complaint,

    role,

    onStatusChange,

    onDelete

}) {

    const badgeClass =

        complaint.status === "Pending"

            ? "bg-yellow-100 text-yellow-700"

            : complaint.status === "Resolved"

            ? "bg-green-100 text-green-700"

            : "bg-blue-100 text-blue-700";

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

            {/* Top */}

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

                    {complaint.status}

                </span>

            </div>

            <hr className="my-5" />

            {

                role === "admin"

                ?

                (

                    <div
                        className="
                            flex
                            justify-between
                            items-center
                        "
                    >

                        <select

                            value={complaint.status}

                            onChange={(e)=>

                                onStatusChange(

                                    complaint._id,

                                    e.target.value

                                )

                            }

                            className="
                                border
                                rounded-lg
                                p-2
                            "

                        >

                            <option>

                                Pending

                            </option>

                            <option>

                                In Progress

                            </option>

                            <option>

                                Resolved

                            </option>

                        </select>

                        <button

                            onClick={()=>

                                onDelete(

                                    complaint._id

                                )

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

                )

                :

                (

                    <div>

                        <p
                            className="
                                text-gray-500
                            "
                        >

                            Status

                        </p>

                        <span
                            className={`
                                inline-block
                                mt-2
                                px-4
                                py-2
                                rounded-full
                                font-medium
                                ${badgeClass}
                            `}
                        >

                            {complaint.status}

                        </span>

                    </div>

                )

            }

        </div>

    );

}

export default ComplaintCard;