import { NavLink as RouterNavLink } from "react-router-dom";

const MobileNavLink = ({ label, href, icon }) => {
  return (
    <RouterNavLink
      to={href}
      className={({ isActive }) => `
        flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all
        ${isActive 
          ? "bg-primary/10 text-primary font-bold" 
          : "text-neutral-text-secondary hover:bg-neutral-surface dark:hover:bg-gray-800"
        }
      `}
    >
      {({ isActive }) => (
        <>
          <span className={`material-symbols-outlined ${isActive ? "text-primary" : "opacity-70"}`}>
            {icon}
          </span>
          <span className="text-[15px] tracking-tight">{label}</span>
          {isActive && (
            <div className="ml-auto animate-in zoom-in duration-300">
              <div className="size-1.5 rounded-full bg-primary" />
            </div>
          )}
        </>
      )}
    </RouterNavLink>
  );
};

export default MobileNavLink