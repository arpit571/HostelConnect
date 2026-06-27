function AuthCard({ title, subtitle, children }) {
    return (
        <div
            className="
                w-full
                max-w-md
                bg-white/95
                backdrop-blur-md
                rounded-3xl
                shadow-2xl
                p-8
            "
        >
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🏨</div>

                <h1 className="text-3xl font-bold text-gray-800">
                    HostelConnect
                </h1>

                <p className="text-sm text-gray-500 mt-2">
                    Smart Hostel Management Platform
                </p>

                <h2 className="text-2xl font-semibold mt-8 text-gray-800">
                    {title}
                </h2>

                <p className="text-gray-500 mt-2">
                    {subtitle}
                </p>
            </div>

            {children}
        </div>
    );
}

export default AuthCard;