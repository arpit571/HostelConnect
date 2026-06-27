import { useState } from "react";

import {
    EyeIcon,
    EyeSlashIcon,
    LockClosedIcon
} from "@heroicons/react/24/outline";

function PasswordInput({
    value,
    onChange,
    placeholder = "Enter Password"
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-5">

            <label
                className="
                    block
                    mb-2
                    text-sm
                    font-medium
                    text-gray-700
                "
            >
                Password
            </label>

            <div className="relative">

                <LockClosedIcon
                    className="
                        w-5
                        h-5
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                    "
                />

                <input
                    type={
                        showPassword
                            ? "text"
                            : "password"
                    }
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-gray-300
                        pl-12
                        pr-12
                        py-3
                        outline-none
                        transition
                        duration-200
                        focus:ring-2
                        focus:ring-blue-500
                        focus:border-blue-500
                    "
                />

                <button
                    type="button"
                    onClick={() =>
                        setShowPassword(
                            !showPassword
                        )
                    }
                    className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-500
                    "
                >
                    {showPassword
                        ? (
                            <EyeSlashIcon className="w-5 h-5" />
                        )
                        : (
                            <EyeIcon className="w-5 h-5" />
                        )}
                </button>

            </div>

        </div>
    );
}

export default PasswordInput;