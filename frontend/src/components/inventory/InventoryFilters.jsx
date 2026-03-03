const InventoryFilters = ({ itemCount, onSearch, onCategoryChange, categories }) => (
  <div className="p-5 border-b border-neutral-border dark:border-gray-800 flex flex-col lg:flex-row gap-4 justify-between items-center">
    <div className="flex items-center gap-3 w-full lg:w-auto">
      <h3 className="font-bold text-lg flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">
          inventory_2
        </span>
        All Ingredients
      </h3>
      <span className="px-2.5 py-0.5 rounded-full bg-neutral-surface dark:bg-gray-800 text-xs font-bold text-neutral-text-secondary">
        {itemCount} Items
      </span>
    </div>
    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
      <div className="relative w-full sm:w-64">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-text-secondary">
          <span className="material-symbols-outlined text-[20px]">search</span>
        </span>
        <input
          className="pl-10 pr-4 py-2.5 bg-neutral-surface dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-900 border focus:border-primary rounded-lg text-sm w-full focus:ring-0 transition-all"
          placeholder="Search ingredients..."
          onChange={onSearch}
        />
      </div>
      <select
        onChange={onCategoryChange}
        className="pr-7 px-4 py-2.5 bg-neutral-surface dark:bg-gray-800 border-transparent rounded-lg text-sm font-medium text-neutral-text-main dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>{category.name}</option>
        ))}
      </select>
      <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-surface dark:bg-gray-800 text-neutral-text-secondary hover:text-neutral-text-main transition-colors">
        <span className="material-symbols-outlined text-[20px]">filter_list</span>
      </button>
    </div>
  </div>
);

export default InventoryFilters;
