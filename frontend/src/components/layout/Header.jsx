
const Header = ({ title, description, children }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-neutral-text-main dark:text-white">
          {title}
        </h1>
        <p className="text-neutral-text-secondary dark:text-gray-400 mt-1">
          {description}
        </p>
      </div>
      <div className="flex gap-3">
        {children}
      </div>
    </div>
  );
};

export default Header;
