import { useState } from "react";

const AuthInputField = ({ label, icon, rightLabel, type, error, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordTag = type === "password";

  return (
    <label className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-center">
        <span
          className={`text-sm font-medium ${error ? "text-red-500" : "text-slate-900 dark:text-white"}`}
        >
          {label}
        </span>
      </div>

      <div className="relative">
        <span
          className={`absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] ${error ? "text-red-500" : "text-slate-400"}`}
        >
          {icon}
        </span>

        <input
          {...props}
          type={isPasswordTag ? (showPassword ? "text" : "password") : type}
          className={`flex w-full rounded-xl h-12 pl-11 pr-10 transition-all duration-200 border text-base
            ${
              error
                ? "border-red-500 focus:ring-red-500/50 focus:border-red-500 bg-white dark:bg-slate-800"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary/50 focus:border-primary"
            }`}
        />

        {error && !isPasswordTag && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <span className="material-symbols-outlined text-red-500 text-[20px]">
              error
            </span>
          </div>
        )}

        {isPasswordTag && (
          <div className="absolute right-4 top-1/2 -translate-y-1/3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`${error ? "text-red-500" : "text-slate-400"}`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        )}
      </div>

      {error && (
        <span className="text-red-500 text-xs font-medium">{error}</span>
      )}
    </label>
  );
};

export default AuthInputField;
