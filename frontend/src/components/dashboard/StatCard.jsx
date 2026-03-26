import React from "react";

const StatCard = ({ title, value, icon, subtitleText, subtitleIcon }) => {
  return (
    <div className="bg-white dark:bg-surface-dark rounded-xl p-5 shadow-sm border border-neutral-border dark:border-border-dark flex items-center gap-4">
      <div className="size-12 rounded-full bg-neutral-surface dark:bg-background-dark flex items-center justify-center text-primary">
        <span className="material-symbols-outlined text-[28px]">
          {icon}
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-neutral-text-secondary dark:text-gray-400">
          {title}
        </p>
        <p className="text-2xl font-black text-neutral-text-main dark:text-white">
          {value}
        </p>
        {subtitleText && (
          <p className="text-xs text-green-600 font-bold flex items-center gap-1">
            {subtitleIcon && (
              <span className="material-symbols-outlined text-[14px]">
                {subtitleIcon}
              </span>
            )}
            {subtitleText}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
