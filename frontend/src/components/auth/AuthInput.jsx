function AuthInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  icon,
  required = false,
}) {
  return (
    <div className="mb-5">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`
            w-full
            rounded-xl
            border
            border-gray-300
            ${icon ? "pl-12" : "pl-4"}
            pr-4
            py-3
            bg-white
            text-gray-900
            placeholder:text-gray-400
            outline-none
            transition
            duration-200
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
          `}
        />
      </div>
    </div>
  );
}

export default AuthInput;