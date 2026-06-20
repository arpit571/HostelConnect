import { useNavigate } from "react-router-dom";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

function LogoutButton() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/login", { replace: true });

    };

    return (

        <button
            onClick={handleLogout}
            className="
                flex
                items-center
                gap-3
                w-full
                px-4
                py-3
                mt-6
                rounded-lg
                bg-red-600
                text-white
                hover:bg-red-700
                transition-all
                duration-200
                font-medium
            "
        >

            <ArrowLeftOnRectangleIcon className="w-6 h-6" />

            Logout

        </button>

    );

}

export default LogoutButton;