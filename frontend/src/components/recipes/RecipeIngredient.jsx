import { useState } from "react";
import IngredientItem from "./IngredientItem";

const RecipeIngredient = () => {
  const [searchTerm, setSearchTerm] = useState("");

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
        <button className="text-sm text-primary font-bold hover:underline flex items-center gap-1">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Ingredient
        </button>
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

        <IngredientItem
          name="Arborio Rice"
          category="Pantry"
          priceInfo="$2.50/kg"
          qty="200"
          unit="g"
          cost="$0.50"
          imgUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAGVD07WB_T5nXNm-SaqaRRz4itCcQeiWqC4NTrabOQStNPj7BXYBaYxwSmgIuXhMg1xItZULtEP1J2iSjznBImZnpTRZYaCRisckZwHRC0FStWHtaKHnejtHL3Uxf0s5FytXuB_Mj6o6rY3oGjxfJgKxUAI6IlKPWfq1xfptCAOd_xwk72QUUqNzCzS1bRxWXOcrpt5a54aoAmZ6PQ2kyQWZrh4BKwrTVwqiCt6-cK8bVcuvo92o8pOLAb3TIwdu7qyaN_doyZEtep"
        />
        <IngredientItem
          name="Wild Mushrooms"
          category="Fresh"
          priceInfo="$12.00/kg"
          qty="150"
          unit="g"
          cost="$1.80"
          imgUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuApJXlP10MNQDLTLvRiInTQxLvNe3Nso2I90OtZ-3JdecJ6dmmVHg9nQT36Cy5xQSu54jmPJ2HBUQ-ivzha3DXvEfIk50sRx7Fyavl_SKdxiRvtf-PPupPagoujPgPSX9p5piCKBthYbtZwrlbjDPZ3zVcqhR7XHrAa3zGndigj-xUFQ1lMhhyVSo-N4E8KZACvCLe9KgUMzZTwhzbP_DIT0W4qtpECBSBdz1mXj5pONOohfLMy7Zxl1E__QaAknhNiF9EWOBucEEOc"
        />
        <IngredientItem
          name="White Truffle Oil"
          category="Oils"
          priceInfo="$45.00/L"
          qty="15"
          unit="ml"
          cost="$0.68"
          imgUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCF_26W3U_qu46rvCuIwtO_WCTOvgQ0tC_tTFBmbh9emxGdP6g-HOFpHEFXkYs5Qp7HkU2l1bd-tT6BIV9OfddkixB_CGreSgxMJuFLplRonRoKgLlfwtAJDm07mnt6nClNZzXcTxlAYQcUtOghbm2vWt7ckyuRE0-vkaJNs_XcuxB_dDb9Rjp4_CJu5rwy2tBAd6H2yPGfbIsof56lyYRuNNcRJyoJOV4WkBVOVHhri8cWKf3VdvIV-0vBT1XlGuerc_dsGtXKRXuo"
        />
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
        {searchTerm.trim() !== "" && (
          <div className="absolute bottom-full left-0 right-0 mb-2 mx-4 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-neutral-border dark:border-gray-700 overflow-hidden max-h-72 overflow-y-auto z-50 animate-in slide-in-from-bottom-2 fade-in duration-200">
            <div className="px-3 py-2 text-xs font-bold text-neutral-text-secondary uppercase tracking-wider bg-neutral-surface/50 dark:bg-gray-800/50 border-b border-neutral-border dark:border-gray-700 sticky top-0">
              Inventory Matches
            </div>

            {/* Match Items */}
            <div className="flex items-center justify-between p-3 cursor-pointer bg-primary/10 dark:bg-primary/20 border-l-4 border-primary">
              <div className="flex items-center gap-3">
                <div
                  className="size-10 rounded-md bg-gray-200 dark:bg-gray-700 bg-cover bg-center shrink-0 border border-neutral-border dark:border-gray-600"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCazeJJJRwysdHhZXYumAH9HtmcCkkOA4dSvdA_AQhKKb5yft1fvt0OCNO-ddUKKO6yZAv62iOpLRmyEkR-93rd_lMRlJ8yu0nIuXgk4FNNnhabxU6Yy8SjeaP633RzuWSgE9Q6QOQ0Vcm4QFRlsXWsR29MniZu5Z1IhrmwO_jAlNwfRDA3Ot6lL9XkkmIK_9R3xQ5j0IuGKTVrYGrcMvpIMehSzW8xEZvzjddrXf7ifGhP1cC0j7HX2jaMNc6gEIjPqDdnkr0SHmMG")',
                  }}
                ></div>
                <div>
                  <p className="font-bold text-sm text-neutral-text-main dark:text-white">
                    Atlantic Salmon Fillet
                  </p>
                  <p className="text-xs text-neutral-text-secondary font-medium">
                    Seafood • In Stock
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-neutral-text-main dark:text-white">
                  $25.00
                  <span className="text-xs font-normal text-gray-500">/kg</span>
                </p>
                <button className="mt-1 text-xs bg-primary text-neutral-text-main px-2 py-0.5 rounded font-bold shadow-sm hover:brightness-110 transition-all">
                  Select
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-neutral-surface dark:hover:bg-gray-800 border-l-4 border-transparent group">
              <div className="flex items-center gap-3">
                <div
                  className="size-10 rounded-md bg-gray-200 dark:bg-gray-700 bg-cover bg-center shrink-0 border border-neutral-border dark:border-gray-600"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDlhQbBHIfXTMvyTb6ervF4V7MZAN4Vel3j8oAgFA-OkZzRGGQcEPR4SrTYIyJAsyxn9kzrLsHulsNNj6DBWs4DoD7-jM6Zbki4ez_eMNs_TOXVvRFDQfota7Eg4kAqBr6TgxTXP6_LKhAo72HpN2yYylJ7m3lK1tpYuKekJzhxY8emOKmRImc7ijKLRnbfRLFwrSu2nL58tH9-VWExtfWwX3P1woGqEy92B-VwiT22IWwk-EpQ5-ecEr_6ClwOmF7fGt-3yPxiCmtF")',
                  }}
                ></div>
                <div>
                  <p className="font-bold text-sm text-neutral-text-main dark:text-white">
                    Himalayan Pink Salt
                  </p>
                  <p className="text-xs text-neutral-text-secondary font-medium">
                    Pantry • In Stock
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-neutral-text-main dark:text-white">
                  $8.50
                  <span className="text-xs font-normal text-gray-500">/kg</span>
                </p>
                <span className="text-xs text-neutral-text-secondary hidden group-hover:inline-block">
                  Click to add
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeIngredient
