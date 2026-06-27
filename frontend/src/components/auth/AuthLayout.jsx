

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
          {subtitle && (
            <p className="text-slate-500 mt-2">{subtitle}</p>
          )}
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;