import api from "../../lib/axios";
import { useState } from "react";
import { COLORS_CATEGORY } from "../data/dashboardMockData";

const PerformanceTable = ({ data = [], onRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const openDeleteModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedRecipe) return;

    try {
      setIsDeleting(true);
      await api.delete(`/recipes/${selectedRecipe.id}`);

      setIsModalOpen(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete recipe. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

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
      <div className="hidden md:block overflow-x-auto">
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
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${COLORS_CATEGORY[recipe.category]}`}
                    >
                      {recipe.category}
                    </span>
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
                  <td className={`px-6 py-4 text-right font-bold ${recipe.profit.toFixed(2) > 0 ? 'text-primary' : 'text-red-600'}`}>
                    ฿ {recipe.profit.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => openDeleteModal(recipe)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        delete
                      </span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-col gap-4 bg-neutral-surface/20 dark:bg-gray-800/10">
        {data.length === 0 ? (
          <div className="py-12 text-center text-neutral-text-secondary italic">No recipe data available.</div>
        ) : (
          data.slice(0, 5).map((recipe, index) => (
            <div key={index} className="flex flex-col overflow-hidden rounded-xl bg-white dark:bg-gray-900 shadow-lg border border-neutral-border dark:border-gray-800 relative">
              
              <button 
                onClick={() => openDeleteModal(recipe)}
                className="absolute top-3 right-3 z-10 size-9 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[20px]">delete</span>
              </button>

              <div
                className="h-40 w-full bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url("${recipe.image || "https://via.placeholder.com/150"}")` }}
              ></div>

              <div className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-neutral-text-secondary dark:text-gray-400 text-xs uppercase tracking-wider font-semibold">
                      {recipe.category}
                    </p>
                    <h3 className="text-neutral-text-main dark:text-white text-lg font-bold leading-tight mt-0.5">
                      {recipe.name}
                    </h3>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-bold ${
                      recipe.margin >= 60 ? "bg-green-500/10 text-green-600 dark:text-green-400" :
                      recipe.margin >= 30 ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" :
                      "bg-red-500/10 text-red-600 dark:text-red-400"
                  }`}>
                    {recipe.margin.toFixed(1)}% Margin
                  </div>
                </div>

                <div className="flex border-t border-neutral-border dark:border-gray-800 pt-3 justify-between">
                  <div className="flex flex-col">
                    <span className="text-neutral-text-secondary dark:text-gray-500 text-[10px] uppercase font-bold tracking-tighter">Cost</span>
                    <span className="text-neutral-text-main dark:text-white font-semibold">฿ {recipe.cost.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-neutral-text-secondary dark:text-gray-500 text-[10px] uppercase font-bold tracking-tighter">Sell Price</span>
                    <span className="text-neutral-text-main dark:text-white font-semibold">฿ {recipe.sellingPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-neutral-text-secondary dark:text-gray-500 text-[10px] uppercase font-bold tracking-tighter">Profit (฿)</span>
                    <span className={`${recipe.profit.toFixed(2) > 0 ? 'text-primary' : 'text-red-600'} dark:text-white font-semibold`}>฿ {recipe.profit.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl shadow-2xl border border-neutral-border dark:border-gray-800 overflow-hidden transform transition-all animate-scale-up">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4 text-red-600">
                <span className="material-symbols-outlined text-3xl">
                  warning
                </span>
                <h3 className="text-xl font-bold text-neutral-text-main dark:text-white">
                  Delete Recipe?
                </h3>
              </div>
              <p className="text-neutral-text-secondary dark:text-gray-400 leading-relaxed">
                Are you sure you want to delete{" "}
                <strong className="text-neutral-text-main dark:text-white">
                  "{selectedRecipe?.name}"
                </strong>
                ? This action cannot be undone.
              </p>
            </div>
            <div className="bg-neutral-surface dark:bg-gray-800/50 px-6 py-4 flex flex-col sm:flex-row-reverse gap-3">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-white dark:bg-gray-800 border border-neutral-border dark:border-gray-700 text-neutral-text-main dark:text-white text-sm font-bold rounded-lg hover:bg-neutral-surface dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceTable;
