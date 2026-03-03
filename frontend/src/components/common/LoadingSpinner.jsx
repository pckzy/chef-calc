const LoadingSpinner = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-neutral-border border-t-primary"></div>
      <p className="mt-4 text-sm font-medium text-neutral-text-secondary animate-pulse">
        Loading {title}...
      </p>
    </div>
  );
};

export default LoadingSpinner;
