function StatCard({

    title,

    value,

    icon,

    color

}) {

    return (

        <div
            className="
                bg-white
                rounded-2xl
                shadow-md
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
                p-6
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

                    <p
                        className="
                            text-gray-500
                            text-sm
                            font-medium
                        "
                    >

                        {title}

                    </p>

                    <h2
                        className="
                            text-4xl
                            font-bold
                            mt-3
                            text-gray-800
                        "
                    >

                        {value}

                    </h2>

                </div>

                <div
                    className={`
                        ${color}
                        w-14
                        h-14
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        text-white
                    `}
                >

                    {icon}

                </div>

            </div>

        </div>

    );

}

export default StatCard;