import { useState } from 'react';

const AuthInputField = ({ label, icon, rightLabel, type, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const isPasswordTag = type === 'password';

  return (
    <label className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-center">
        <span className="text-slate-900 dark:text-white text-sm font-medium">
          {label}
        </span>
        {rightLabel}
      </div>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">
          {icon}
        </span>

        <input
          {...props}
          type={isPasswordTag ? (showPassword ? 'text' : 'password') : type}
          className="flex w-full rounded-xl text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/50 h-12 pl-11 pr-12 transition-all duration-200"
        />

        {isPasswordTag && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/3 text-slate-400 hover:text-slate-500 dark:hover:text-slate-200 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        )}
      </div>
    </label>
  );
};

export default AuthInputField;