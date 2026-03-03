const UNIT_RULES = {
  kg: { options: ["kg", "g"], max: { kg: 1, g: 1000 } },
  g: { options: ["g", "kg"], max: { g: 1000, kg: 1 } },
  l: { options: ["L", "ml"], max: { L: 1, ml: 1000 } },
  ml: { options: ["ml", "L"], max: { ml: 1000, L: 1 } },
  unit: { options: ["unit"], max: { unit: 100 } },
  pack: { options: ["pack"], max: { pack: 100 } },
  can: { options: ["can"], max: { can: 100 } },
  box: { options: ["box"], max: { box: 100 } },
};

const IngredientItem = ({ item, onUpdate, onDelete }) => {
  const lowerBase = String(item.baseUnit || item.unit).toLowerCase();
  const rules = UNIT_RULES[lowerBase] || {
    options: [item.unit],
    max: { [item.unit]: 100 },
  };

  const availableUnits = rules.options;
  const maxQty = rules.max[item.unit] || 100;

  const handleQtyChange = (e) => {
    let val = e.target.value;
    if (val !== "") {
      let num = Number(val);
      if (num > maxQty) val = String(maxQty);
      else if (num < 0) val = "0";
    }
    onUpdate(item.id, "qty", val);
  };

  const formatNumber = (num) => {
    if (!num) return "0.00";
    return Number(num).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="group flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-2 sm:items-center p-3 rounded-lg hover:bg-neutral-surface dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-neutral-border dark:hover:border-gray-700 mb-1">
      <div className="col-span-5 w-full flex items-start sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="size-10 sm:size-8 rounded bg-gray-200 dark:bg-gray-700 bg-cover bg-center shrink-0"
            style={{ backgroundImage: `url("${item.imgUrl}")` }}
          ></div>
          <div>
            <p className="font-medium text-sm text-neutral-text-main dark:text-white leading-tight">
              {item.name}
            </p>
            <p className="text-xs text-neutral-text-secondary mt-0.5 sm:mt-0">
              {item.category} • {item.priceInfo}
            </p>
          </div>
        </div>
        <button
          onClick={() => onDelete(item.id)}
          className="sm:hidden text-red-500 hover:text-red-700 transition-colors p-1"
        >
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </div>

      <div className="w-full flex items-center justify-between gap-2 sm:contents">
        <div className="col-span-2 w-20 sm:w-full sm:text-right">
          <input
            className="w-full text-center sm:text-right bg-white dark:bg-gray-900 border border-neutral-border dark:border-gray-600 rounded px-2 py-1.5 sm:py-1 text-sm focus:border-primary focus:ring-0"
            type="number"
            step="any"
            min="1"
            max={maxQty}
            value={item.qty}
            onChange={handleQtyChange}
          />
        </div>

        <div className="col-span-2 w-24 sm:w-full">
          <select
            value={item.unit}
            onChange={(e) => onUpdate(item.id, "unit", e.target.value)}
            className="w-full bg-transparent border-none text-sm py-1.5 sm:py-1 pl-1 sm:pl-0 focus:ring-0 text-neutral-text-secondary font-medium cursor-pointer"
          >
            {availableUnits.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2 w-auto sm:w-full text-right font-bold text-neutral-text-main dark:text-white text-sm">
          ฿{formatNumber(item.calculatedCost)}
        </div>

        <div className="col-span-1 hidden sm:flex w-full justify-end opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onDelete(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            <span className="material-symbols-outlined text-[20px]">
              delete
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IngredientItem;
