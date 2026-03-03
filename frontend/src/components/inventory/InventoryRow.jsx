import dayjs from "dayjs";

const InventoryRow = ({ ingredient, onClick }) => {
  const dateString = ingredient.updated_at;
  const formattedDate = dayjs(dateString).format("MMM D, YYYY");
  const getCategoryColor = (categoryName) => {
    const colors = {
      Pantry:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
      "Fresh Produce":
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
      "Dairy & Eggs":
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      "Meat & Poultry":
        "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
      Seafood:
        "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
      "Spices & Herbs":
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      "Oils & Vinegars":
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
      "Sauces & Condiments":
        "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
      Bakery:
        "bg-stone-100 text-stone-700 dark:bg-stone-900/30 dark:text-stone-300",
      Beverages:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      "Frozen Foods":
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
      Packaging:
        "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300",
    };

    return (
      colors[categoryName] ||
      "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    );
  };

  const formatNumber = (num) => {
    if (!num) return "0.00";
    return Number(num).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div onClick={onClick} className="group flex flex-col md:grid md:grid-cols-12 gap-4 items-center p-4 hover:bg-neutral-surface dark:hover:bg-gray-800 transition-colors cursor-pointer">
      <div className="col-span-4 w-full flex items-center gap-4">
        <div
          className="size-10 rounded bg-gray-200 dark:bg-gray-700 bg-cover bg-center shrink-0 border border-neutral-border dark:border-gray-600"
          style={{
            backgroundImage: `url("${ingredient.image_url || "https://via.placeholder.com/40"}")`,
          }}
          aria-label={ingredient.name}
        ></div>
        <div>
          <p className="font-bold text-sm text-neutral-text-main dark:text-white leading-tight">
            {ingredient.name}
          </p>
          <p className="text-xs text-neutral-text-secondary md:hidden">
            Pantry
          </p>
        </div>
      </div>
      <div className="col-span-2 w-full hidden md:block">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-bold ${getCategoryColor(ingredient.ingredient_categories?.name)}`}
        >
          {ingredient.ingredient_categories?.name || "Uncategorized"}
        </span>
      </div>
      <div className="col-span-2 w-full flex justify-between md:justify-end items-center md:text-right">
        <span className="text-xs font-semibold text-neutral-text-secondary md:hidden">
          Price
        </span>
        <div className="font-bold text-neutral-text-main dark:text-white">
          ฿{formatNumber(ingredient.purchase_price)}
        </div>
      </div>
      <div className="col-span-2 w-full flex justify-between md:justify-start items-center">
        <span className="text-xs font-semibold text-neutral-text-secondary md:hidden">
          Unit
        </span>
        <div className="text-sm text-neutral-text-secondary">
          per {ingredient.unit}
        </div>
      </div>
      <div className="col-span-2 w-full flex justify-between md:justify-end items-center md:text-right">
        <span className="text-xs font-semibold text-neutral-text-secondary md:hidden">
          Last Updated
        </span>
        <div className="text-sm text-neutral-text-secondary">
          {formattedDate}
        </div>
      </div>
    </div>
  );
};

export default InventoryRow;
