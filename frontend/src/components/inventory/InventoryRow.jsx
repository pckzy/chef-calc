import dayjs from "dayjs";
import { useState } from "react";
import api from "../../lib/axios";

const InventoryRow = ({ ingredient, onClick, onRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");


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

  const openDeleteModal = () => {
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setErrorMsg("");
      
      await api.delete(`/ingredients/${ingredient.id}`); //
      
      setIsModalOpen(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg(error.response.data.error); 
      } else {
        setErrorMsg("Failed to delete ingredient. Please try again.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="group flex flex-col md:grid md:grid-cols-12 gap-4 items-center p-4 hover:bg-neutral-surface dark:hover:bg-gray-800 transition-colors cursor-pointer"
    >
      <div className="col-span-3 w-full flex items-center gap-4">
        <div
          className="size-10 rounded bg-gray-200 dark:bg-gray-700 bg-cover bg-center shrink-0 border border-neutral-border dark:border-gray-600"
          style={{
            backgroundImage: `url("${ingredient.image_url || "https://via.placeholder.com/40"}")`,
          }}
          aria-label={ingredient.name}
        ></div>
        <div className="flex items-center justify-between w-full">
          <div className="flex-col">
            <p className="font-bold text-sm text-neutral-text-main dark:text-white leading-tight">
              {ingredient.name}
            </p>
            <p
              className={`text-xs w-fit ${getCategoryColor(ingredient.ingredient_categories?.name)} md:hidden`}
            >
              {ingredient.ingredient_categories?.name || "Uncategorized"}
            </p>
          </div>
          <div className="md:hidden flex gap-3">
            <button
              onClick={onClick}
              className="text-yellow-600 hover:text-yellow-800 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">edit</span>
            </button>
            <button
              onClick={openDeleteModal}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>
          </div>
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
      <div className="col-span-1 gap-2 w-full hidden md:flex justify-between md:justify-end items-center md:text-right">
        <button
          onClick={onClick}
          className="text-yellow-600 hover:text-yellow-800 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">edit</span>
        </button>
        <button
          onClick={openDeleteModal}
          className="text-red-600 hover:text-red-800 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={(e) => e.stopPropagation()}>
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl shadow-2xl border border-neutral-border dark:border-gray-800 overflow-hidden transform transition-all animate-scale-up">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4 text-red-600">
                <span className="material-symbols-outlined text-3xl">warning</span>
                <h3 className="text-xl font-bold text-neutral-text-main dark:text-white">Delete Ingredient?</h3>
              </div>
              <p className="text-neutral-text-secondary dark:text-gray-400 leading-relaxed mb-4">
                Are you sure you want to delete <strong className="text-neutral-text-main dark:text-white">"{ingredient.name}"</strong>? This action cannot be undone.
              </p>

              {/* 🟢 แสดง Error เฉพาะเมื่อลบไม่ได้เนื่องจากติดสูตรอาหาร */}
              {errorMsg && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2 animate-shake">
                  <span className="material-symbols-outlined text-red-600 text-[18px] mt-0.5">error</span>
                  <p className="text-xs text-red-700 dark:text-red-400 font-medium">{errorMsg}</p>
                </div>
              )}
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

export default InventoryRow;
