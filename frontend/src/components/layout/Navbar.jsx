import NavLink from "./NavLink";

const Navbar = () => (
  <header className="flex items-center justify-between border-b border-neutral-border bg-background-light dark:bg-background-dark dark:border-gray-800 px-6 py-3 sticky top-0 z-50 font-display">
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-4 text-neutral-text-main dark:text-white">
        <div className="size-6 text-primary">
          <span className="material-symbols-outlined">calculate</span>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
          Chef Calc
        </h2>
      </div>
      <nav className="hidden md:flex items-center gap-9">
        <NavLink label="Dashboard" href="/dashboard" />
        <NavLink label="Inventory" href="/inventory" />
        <NavLink label="Recipes" href="/recipes" />
        <NavLink label="Settings" href="/settings" />
      </nav>
    </div>
    <div className="flex items-center gap-4">
      <div
        className="bg-center bg-no-repeat bg-cover rounded-full size-10 border border-neutral-border"
        data-alt="User profile picture"
      ></div>
    </div>
  </header>
);

export default Navbar;
