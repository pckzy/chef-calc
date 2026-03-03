import { useState } from "react";
import NavLink from "./NavLink";
import MobileNavLink from "./MobileNavLink";
import supabase from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();

      localStorage.removeItem("sb-access-token");

      // localStorage.clear();

      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
      navigate("/login");
    }
  };

  return (
    <header className="flex items-center justify-between border-b border-neutral-border bg-background-light dark:bg-background-dark dark:border-gray-800 px-6 py-3 sticky top-0 z-50 font-display">
      <div className="flex items-center gap-8">
        {/* Logo Section */}
        <div className="flex items-center gap-4 text-neutral-text-main dark:text-white">
          <div className="size-6 text-primary">
            <span className="material-symbols-outlined">calculate</span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
            Chef Calc
          </h2>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-9">
          <NavLink label="Dashboard" href="/dashboard" />
          <NavLink label="Inventory" href="/inventory" />
          <NavLink label="Recipes" href="/recipes" />
          <NavLink label="Settings" href="/settings" />
        </nav>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Profile Picture & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="bg-center bg-no-repeat bg-cover rounded-full size-10 border border-neutral-border dark:border-gray-700 hover:ring-2 hover:ring-primary/20 transition-all overflow-hidden"
            style={{
              backgroundImage:
                'url("https://api.dicebear.com/7.x/avataaars/svg?seed=Pick")',
            }}
          ></button>

          {/* Profile Dropdown Card */}
          {isProfileOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsProfileOpen(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-neutral-border dark:border-gray-800 rounded-xl shadow-xl z-20 overflow-hidden py-1 animate-in fade-in zoom-in duration-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    logout
                  </span>
                  Logout
                </button>
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex items-center justify-center size-10 rounded-lg text-neutral-text-secondary hover:bg-neutral-surface dark:hover:bg-gray-800 transition-colors"
        >
          <span className="material-symbols-outlined">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-[67px] bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-b border-neutral-border dark:border-gray-800 md:hidden z-50 shadow-2xl animate-in slide-in-from-top duration-300 ease-out">
            <nav className="p-4 space-y-2">
              <div
                className="grid grid-cols-1 gap-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <MobileNavLink
                  label="Dashboard"
                  href="/dashboard"
                  icon="dashboard"
                />
                <MobileNavLink
                  label="Inventory"
                  href="/inventory"
                  icon="inventory_2"
                />
                <MobileNavLink
                  label="Recipes"
                  href="/recipes"
                  icon="restaurant_menu"
                />
                <MobileNavLink
                  label="Settings"
                  href="/settings"
                  icon="settings"
                />
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
