import { useState, useEffect } from "react";
import api from "../services/api";

function Notices() {

    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchNotices = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const response =
                    await api.get(
                        "/notices",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setNotices(response.data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        fetchNotices();

    }, []);

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

                <h1
                    className="
                        text-3xl
                        font-bold
                        text-gray-800
                    "
                >

                    Notices

                </h1>

                <p
                    className="
                        text-gray-500
                        mt-2
                    "
                >

                    Stay updated with the latest hostel announcements.

                </p>

            </div>

            {

                notices.length === 0

                ?

                (

                    <div
                        className="
                            bg-white
                            rounded-2xl
                            shadow-md
                            p-10
                            text-center
                        "
                    >

                        <h2
                            className="
                                text-2xl
                                font-semibold
                            "
                        >

                            No Notices Available

                        </h2>

                        <p
                            className="
                                text-gray-500
                                mt-3
                            "
                        >

                            There are no announcements yet.

                        </p>

                    </div>

                )

                :

                (

                    <div
                        className="
                            space-y-6
                        "
                    >

                        {

                            notices.map(

                                (notice) => (

                                    <div

                                        key={notice._id}

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
                                                        text-2xl
                                                        font-semibold
                                                        text-gray-800
                                                    "
                                                >

                                                    {notice.title}

                                                </h2>

                                                <p
                                                    className="
                                                        text-xs
                                                        text-gray-400
                                                        mt-1
                                                    "
                                                >

                                                    Notice ID

                                                </p>

                                                <p
                                                    className="
                                                        text-xs
                                                        text-gray-500
                                                    "
                                                >

                                                    {notice._id}

                                                </p>

                                            </div>

                                            <span
                                                className="
                                                    bg-blue-100
                                                    text-blue-700
                                                    px-4
                                                    py-2
                                                    rounded-full
                                                    text-sm
                                                    font-medium
                                                "
                                            >

                                                Notice

                                            </span>

                                        </div>

                                        <hr className="my-5" />

                                        <p
                                            className="
                                                text-gray-600
                                                leading-7
                                            "
                                        >

                                            {notice.description}

                                        </p>

                                    </div>

                                )

                            )

                        }

                    </div>

                )

            }

        </div>

    );

}

export default Notices;