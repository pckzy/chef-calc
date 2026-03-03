import { useEffect, useState } from "react";

const RecipeSummary = ({ summaryData, setSummaryData, ingredients }) => {
  const [targetMargin, setTargetMargin] = useState(25);
  const [taxRate, setTaxRate] = useState(7);

  useEffect(() => {
    const totalCost = (ingredients || []).reduce(
      (sum, item) => sum + Number(item.calculatedCost || 0),
      0,
    );

    const sellingPrice = Number(summaryData.actualSellingPrice) || 0;
    const currentTargetMargin = Number(targetMargin) || 0;
    const currentTaxRate = Number(taxRate) || 0;

    const costPercent = sellingPrice > 0 ? (totalCost / sellingPrice) * 100 : 0;
    const marginPercent =
      sellingPrice > 0 ? ((sellingPrice - totalCost) / sellingPrice) * 100 : 0;

    const suggested =
      currentTargetMargin < 100
        ? totalCost / (1 - currentTargetMargin / 100)
        : 0;
    const suggestedInclTax = suggested * (1 + currentTaxRate / 100);

    setSummaryData((prev) => ({
      ...prev,
      totalSpendPrice: totalCost.toFixed(2),
      suggestedPrice: suggested.toFixed(2),
      suggestedPriceInclTax: suggestedInclTax.toFixed(2),
      actualCostPercent: costPercent.toFixed(2),
      actualMarginPercent: marginPercent.toFixed(2),
    }));
  }, [
    ingredients,
    summaryData.actualSellingPrice,
    targetMargin,
    taxRate,
    setSummaryData,
  ]);

  return (
    <>
      <div className="bg-neutral-text-main dark:bg-gray-900 text-white rounded-xl shadow-lg border border-neutral-text-main dark:border-gray-800 overflow-hidden shrink-0">
        <div className="p-6 pb-0">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-white">
            <span className="material-symbols-outlined text-primary">
              calculate
            </span>
            Costing Summary
          </h3>
          <div className="flex justify-between items-end mb-2">
            <span className="text-gray-400 text-sm font-medium">
              Cost per portion
            </span>
            <span className="text-2xl font-bold tracking-tight text-white">
              ฿{summaryData.totalSpendPrice || "0.00"}
            </span>
          </div>
          {/* Progress Bar อิงตาม Cost % */}
          <div className="w-full bg-gray-800 rounded-full h-1.5 mb-8">
            <div
              className="bg-primary h-1.5 rounded-full"
              style={{
                width: `${Math.min(summaryData.actualCostPercent || 0, 100)}%`,
              }}
            ></div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-300">
                  Target Margin %
                </label>
                <span className="text-xs text-primary font-bold">
                  Recommended: 25%
                </span>
              </div>
              <div className="relative">
                <input
                  className="w-full bg-gray-800 border-gray-700 rounded-lg text-white font-bold pr-8 focus:border-primary focus:ring-primary"
                  type="number"
                  value={targetMargin}
                  onChange={(e) => setTargetMargin(e.target.value)}
                />
                <span className="absolute right-3 top-2.5 text-gray-400 font-bold">
                  %
                </span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-1 block">
                Tax Rate (VAT)
              </label>
              <div className="relative">
                <input
                  className="w-full bg-gray-800 border-gray-700 rounded-lg text-white font-bold pr-8 focus:border-primary focus:ring-primary"
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                />
                <span className="absolute right-3 top-2.5 text-gray-400 font-bold">
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-[#1a2e23] p-6 border-t border-gray-700">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-300 text-sm">Suggested Price</span>
            <span className="text-primary font-mono text-xl font-bold">
              ฿{summaryData.suggestedPrice || "0.00"}
            </span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-400 text-xs">Incl. Tax</span>
            <span className="text-gray-400 font-mono text-sm">
              ฿{summaryData.suggestedPriceInclTax || "0.00"}
            </span>
          </div>
          <label className="block">
            <span className="font-bold text-white mb-2 block uppercase tracking-wider text-xs">
              Actual Selling Price
            </span>
            <div className="relative">
              <span className="absolute left-3 top-3 text-white font-bold">
                ฿
              </span>
              <input
                className="w-full pl-7 text-right bg-primary text-neutral-text-main font-black text-xl rounded-lg border-none focus:ring-2 focus:ring-white h-12"
                type="number"
                value={summaryData.actualSellingPrice}
                onChange={(e) =>
                  setSummaryData({
                    ...summaryData,
                    actualSellingPrice: e.target.value,
                  })
                }
              />
            </div>
          </label>
          <div className="mt-4 flex justify-between text-xs font-medium">
            <span className="text-gray-400">Actual Cost %</span>
            <span className="text-primary">
              {summaryData.actualCostPercent || "0.00"}%
            </span>
          </div>
          <div className="mt-1 flex justify-between text-xs font-medium">
            <span className="text-gray-400">Actual Margin %</span>
            <span className="text-white">
              {summaryData.actualMarginPercent || "0.00"}%
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeSummary;
