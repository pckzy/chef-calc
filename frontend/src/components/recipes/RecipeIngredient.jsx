import { useState, useEffect } from "react";
import api from "../../lib/axios";
import IngredientItem from "./IngredientItem";

const UNIT_MULTIPLIERS = {
  kg: { kg: 1, g: 0.001 },
  g: { g: 1, kg: 1000 },
  l: { l: 1, ml: 0.001 },
  ml: { ml: 1, l: 1000 },
  unit: { unit: 1 },
  pack: { pack: 1 },
  can: { can: 1 },
  box: { box: 1 },
};

const calculateCost = (qty, selectedUnit, baseUnit, basePrice) => {
  const lowerBase = String(baseUnit || selectedUnit).toLowerCase();
  const lowerSelected = String(selectedUnit).toLowerCase();

  const multipliers = UNIT_MULTIPLIERS[lowerBase] || { [lowerSelected]: 1 };

  const rateToBase = multipliers[lowerSelected] || 1;
  return (Number(qty || 0) * rateToBase * Number(basePrice)).toFixed(2);
};

const RecipeIngredient = ({ ingredients, setIngredients }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const formatNumber = (num) => {
    if (!num) return "0.00";
    return Number(num).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await api.get("/ingredients");
        setInventory(response.data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };
    fetchInventory();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filtered = inventory.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const notAddedYet = !ingredients.some(
        (selected) => selected.id === item.id,
      );
      return matchesSearch && notAddedYet;
    });

    setSearchResults(filtered);
  }, [searchTerm, inventory, ingredients]);

  const handleSelectIngredient = (item) => {
    const baseU = item.unit || "unit";

    const newItem = {
      id: item.id,
      name: item.name,
      category: item.ingredient_categories?.name,
      priceInfo: `฿${formatNumber(item.purchase_price)}/${baseU}`,
      imgUrl:
        item.image_url ||
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBPQspWHU_ME5D1MzmL8uRL9n4W_ft7ctlEN2tIe2irbHXwVzFTlGcXGq_iDmuHtbolZj_oeJ0JGp9Yzy499AcJYcJZmzbijT93inPkUEf6zSxjA9vtjok74ozhIJZOTKEvtk9iCvXANyGysbnWCMx9BFEUvsBwWgezw0QlJXwpmvdXc_rDmp7Wmfgug8Gk1gYffyhG4BNag2GkZpLznL0m7ANg_LHas1Z6Z0NwYUsDPCLwtR1sW3crPxKepIvLD4hS493n5fhe-g9M",
      qty: 1,
      unit: baseU,
      baseUnit: baseU,
      calculatedCost: Number(item.purchase_price).toFixed(2),
      basePrice: Number(item.purchase_price),
    };

    setIngredients([...ingredients, newItem]);
    setSearchTerm("");
  };

  const handleUpdateIngredient = (id, field, value) => {
    setIngredients(
      ingredients.map((ing) => {
        if (ing.id !== id) return ing;

        let updatedIng = { ...ing, [field]: value };

        updatedIng.calculatedCost = calculateCost(
          updatedIng.qty,
          updatedIng.unit,
          updatedIng.baseUnit,
          updatedIng.basePrice,
        );

        return updatedIng;
      }),
    );
  };

  const handleDeleteIngredient = (id) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-neutral-border dark:border-gray-800 flex-1 flex flex-col ring-4 ring-primary/10 transition-all min-h-0">
      {/* Header */}
      <div className="p-5 border-b border-neutral-border dark:border-gray-800 flex justify-between items-center shrink-0">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            kitchen
          </span>
          Ingredients
        </h3>
      </div>

      {/* Scrollable List Area (Fix: Uses flex-1 and overflow-y-auto instead of max-h) */}
      <div className="p-2 overflow-y-auto flex-1 min-h-0 scrollbar-hide">
        <div className="grid grid-cols-12 gap-2 px-4 py-2 text-xs font-semibold text-neutral-text-secondary uppercase tracking-wider sticky top-0 bg-white dark:bg-gray-900 z-10">
          <div className="col-span-5">Item</div>
          <div className="col-span-2 text-right">Qty</div>
          <div className="col-span-2">Unit</div>
          <div className="col-span-2 text-right">Cost</div>
          <div className="col-span-1"></div>
        </div>

        {ingredients.length === 0 ? (
          <div className="text-center py-10 text-neutral-text-secondary text-sm italic">
            Search below to add ingredients to your recipe.
          </div>
        ) : (
          ingredients.map((ing) => (
            <IngredientItem
              key={ing.id}
              item={ing}
              onUpdate={handleUpdateIngredient}
              onDelete={handleDeleteIngredient}
            />
          ))
        )}
      </div>

      {/* Search Area */}
      <div className="relative p-4 border-t border-neutral-border dark:border-gray-800 bg-white dark:bg-gray-900 rounded-b-xl shrink-0 z-50">
        <div className="relative z-50">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
            <span className="material-symbols-outlined">search</span>
          </span>
          <input
            className="pl-10 pr-16 py-3 bg-white dark:bg-gray-900 border-2 border-primary rounded-lg text-sm w-full focus:ring-0 focus:border-primary placeholder:text-neutral-text-main/50 font-medium shadow-sm transition-colors"
            placeholder="Search ingredient to add..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                onClick={() => setSearchTerm("")}
                className="text-xs font-bold text-neutral-text-secondary hover:text-primary transition-colors"
              >
                CLEAR
              </button>
            </span>
          )}
        </div>

        {/* Dropdown - Fix: Only shows when there is a search term */}
        {searchResults.length > 0 && (
          <div className="absolute bottom-full left-0 right-0 mb-2 mx-4 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-neutral-border dark:border-gray-700 overflow-hidden max-h-72 overflow-y-auto z-50 animate-in slide-in-from-bottom-2 fade-in duration-200">
            <div className="px-3 py-2 text-xs font-bold text-neutral-text-secondary uppercase tracking-wider bg-neutral-surface/50 dark:bg-gray-800/50 border-b border-neutral-border dark:border-gray-700 sticky top-0">
              Inventory Matches
            </div>

            {searchResults.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectIngredient(item)}
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-neutral-surface dark:hover:bg-gray-800 hover:border-l-4 hover:border-primary group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="size-10 rounded-md bg-gray-200 dark:bg-gray-700 bg-cover bg-center shrink-0 border border-neutral-border dark:border-gray-600"
                    style={{
                      backgroundImage: `url("${item.image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuBPQspWHU_ME5D1MzmL8uRL9n4W_ft7ctlEN2tIe2irbHXwVzFTlGcXGq_iDmuHtbolZj_oeJ0JGp9Yzy499AcJYcJZmzbijT93inPkUEf6zSxjA9vtjok74ozhIJZOTKEvtk9iCvXANyGysbnWCMx9BFEUvsBwWgezw0QlJXwpmvdXc_rDmp7Wmfgug8Gk1gYffyhG4BNag2GkZpLznL0m7ANg_LHas1Z6Z0NwYUsDPCLwtR1sW3crPxKepIvLD4hS493n5fhe-g9M"}")`,
                    }}
                  ></div>
                  <div>
                    <p className="font-bold text-sm text-neutral-text-main dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-neutral-text-secondary font-medium">
                      {item.ingredient_categories?.name} • {item.unit}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-neutral-text-main dark:text-white">
                    ฿{formatNumber(item.purchase_price)}
                    <span className="text-xs font-normal text-gray-500">
                      /{item.unit}
                    </span>
                  </p>
                  <span className="text-xs text-neutral-text-secondary hidden group-hover:inline-block">
                    Click to add
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeIngredient;
