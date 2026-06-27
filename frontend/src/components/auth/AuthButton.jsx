

const AuthButton = ({
  text,
  loading = false,
}) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
    >
      {loading ? "Please wait..." : text}
    </button>
  );
};

export default AuthButton;