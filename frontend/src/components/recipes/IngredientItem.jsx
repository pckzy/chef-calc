const IngredientItem = ({
  name,
  category,
  priceInfo,
  qty,
  unit,
  cost,
  imgUrl,
}) => (
  <div className="group flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-2 sm:items-center p-3 rounded-lg hover:bg-neutral-surface dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-neutral-border dark:hover:border-gray-700 mb-1">
    
    <div className="col-span-5 w-full flex items-start sm:items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="size-10 sm:size-8 rounded bg-gray-200 dark:bg-gray-700 bg-cover bg-center shrink-0"
          style={{ backgroundImage: `url("${imgUrl}")` }}
        ></div>
        <div>
          <p className="font-medium text-sm text-neutral-text-main dark:text-white leading-tight">
            {name}
          </p>
          <p className="text-xs text-neutral-text-secondary mt-0.5 sm:mt-0">
            {category} • {priceInfo}
          </p>
        </div>
      </div>
      <button className="sm:hidden text-red-500 hover:text-red-700 transition-colors p-1">
        <span className="material-symbols-outlined text-[20px]">delete</span>
      </button>
    </div>

    <div className="w-full flex items-center justify-between gap-2 sm:contents">
      
      <div className="col-span-2 w-20 sm:w-full sm:text-right">
        <input
          className="w-full text-center sm:text-right bg-white dark:bg-gray-900 border border-neutral-border dark:border-gray-600 rounded px-2 py-1.5 sm:py-1 text-sm focus:border-primary focus:ring-0"
          type="number"
          defaultValue={qty}
        />
      </div>
      
      <div className="col-span-2 w-24 sm:w-full">
        <select
          defaultValue={unit}
          className="w-full bg-transparent border-none text-sm py-1.5 sm:py-1 pl-1 sm:pl-0 focus:ring-0 text-neutral-text-secondary font-medium cursor-pointer"
        >
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="oz">oz</option>
          <option value="ml">ml</option>
          <option value="L">L</option>
          <option value="tbsp">tbsp</option>
        </select>
      </div>
      
      <div className="col-span-2 w-auto sm:w-full text-right font-bold text-neutral-text-main dark:text-white text-sm">
        {cost}
      </div>
      
      <div className="col-span-1 hidden sm:flex w-full justify-end opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="text-red-500 hover:text-red-700">
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </div>
      
    </div>
  </div>
);

export default IngredientItem;