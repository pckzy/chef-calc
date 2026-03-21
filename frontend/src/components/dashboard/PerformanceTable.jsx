import React from "react";

const PerformanceTable = ({ data = [] }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-neutral-border dark:border-gray-800 overflow-hidden">
      <div className="p-5 border-b border-neutral-border dark:border-gray-800 flex justify-between items-center">
        <h3 className="font-bold text-lg flex items-center gap-2 text-neutral-text-main dark:text-white">
          <span className="material-symbols-outlined text-primary">
            history
          </span>
          Recent Recipe Performance
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-neutral-surface dark:bg-gray-800 text-neutral-text-secondary uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-4">Recipe Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-right">Food Cost</th>
              <th className="px-6 py-4 text-right">Sell Price</th>
              <th className="px-6 py-4 text-right">Margin %</th>
              <th className="px-6 py-4 text-right">Profit (฿)</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-border dark:divide-gray-800">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-8 text-center text-neutral-text-secondary"
                >
                  No recipe data available.
                </td>
              </tr>
            ) : (
              data.slice(0, 5).map((recipe, index) => (
                <tr
                  key={index}
                  className="group hover:bg-neutral-surface/50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-neutral-text-main dark:text-white flex items-center gap-3">
                    <div
                      className="size-10 rounded bg-gray-200 dark:bg-gray-700 bg-cover bg-center shrink-0"
                      style={{
                        backgroundImage: `url("${recipe.image || "https://via.placeholder.com/150"}")`,
                      }}
                    ></div>
                    {recipe.name}
                  </td>
                  <td className="px-6 py-4 text-neutral-text-secondary">
                    {recipe.category}
                  </td>
                  <td className="px-6 py-4 text-right font-medium">
                    ฿ {recipe.cost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right font-medium">
                    ฿ {recipe.sellingPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        recipe.margin >= 60
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : recipe.margin >= 30
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {recipe.margin.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-primary">
                    ฿ {recipe.profit.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-neutral-text-secondary hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        edit
                      </span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformanceTable;
