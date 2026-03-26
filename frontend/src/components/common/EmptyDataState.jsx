const EmptyDataState = ({
  title = "No Data Available",
  message = "Start by adding your first record to see insights.",
}) => (
  <div className="flex flex-col items-center justify-center h-full w-full py-10 animate-fade-in">
    <div className="size-16 rounded-full bg-neutral-surface dark:bg-background-dark flex items-center justify-center text-neutral-text-secondary dark:text-primary mb-4 border border-dashed border-neutral-border dark:border-gray-700">
      <span className="material-symbols-outlined text-[32px]">
        database_off
      </span>
    </div>
    <h4 className="text-neutral-text-main dark:text-white font-bold text-base mb-1">
      {title}
    </h4>
    <p className="text-neutral-text-secondary dark:text-gray-400 text-xs text-center max-w-[200px]">
      {message}
    </p>
  </div>
);

export default EmptyDataState;
