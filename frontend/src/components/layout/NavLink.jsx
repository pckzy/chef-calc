import { NavLink as RouterNavLink } from "react-router-dom";

const NavLink = ({ label, href }) => {
  return (
    <RouterNavLink
      to={href}
      className={({ isActive }) =>
        `${isActive
            ? "text-sm font-bold leading-normal text-primary"
            : "text-sm font-medium leading-normal hover:text-primary transition-colors"
        }`
      }
    >
      {label}
    </RouterNavLink>
  );
};

export default NavLink;
