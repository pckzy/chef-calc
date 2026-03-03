import Navbar from "../components/layout/Navbar";
import Header from "../components/layout/Header";
import InventoryFilters from "../components/inventory/InventoryFilters";
import InventoryRow from "../components/inventory/InventoryRow";
import InventoryPagination from "../components/inventory/InventoryPagination";
import { useState, useEffect, useMemo } from "react";
import AddIngredientDrawer from "../components/inventory/AddIngredientDrawer";
import LoadingSpinner from "../components/common/LoadingSpinner";
import api from "../lib/axios";

const InventoryPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const onSearch = (e) => setSearchName(e.target.value);
  const onCategoryChange = (e) => setSelectedCategory(e.target.value);

  const fetchIngredients = async () => {
    try {
      setLoading(true);
      const response = await api.get("/ingredients");
      setIngredients(response.data);
    } catch (err) {
      console.error("Error fetching ingredients:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (ingredient) => {
    setSelectedIngredient(ingredient);
    setIsDrawerOpen(true);
  };

  const handleAddNewClick = () => {
    setSelectedIngredient(null);
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/ingredients/categories");
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
    fetchIngredients();
  }, []);

  const filteredIngredients = useMemo(() => {
    return ingredients.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchName.toLowerCase());

      const matchesCategory =
        selectedCategory === "" ||
        item.ingredient_categories?.name === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [ingredients, searchName, selectedCategory]);

  const paginatedIngredients = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredIngredients.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredIngredients, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchName, selectedCategory]);

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-neutral-text-main dark:text-gray-100 flex flex-col font-display">
      <Navbar />
      <main className="flex-1 overflow-x-hidden p-6 md:p-8 max-w-[1600px] mx-auto w-full">
        <Header
          title="Ingredient Inventory"
          description="Manage stock and update prices."
        >
          <button
            onClick={handleAddNewClick}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-sm font-bold"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Add Ingredient</span>
          </button>
        </Header>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-neutral-border dark:border-gray-800 flex flex-col h-full">
          <InventoryFilters
            categories={categories}
            itemCount={filteredIngredients.length}
            onCategoryChange={onCategoryChange}
            onSearch={onSearch}
          />
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-neutral-surface/50 dark:bg-gray-800/50 text-xs font-semibold text-neutral-text-secondary uppercase tracking-wider border-b border-neutral-border dark:border-gray-800">
            <div className="col-span-4">Ingredient Name</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2">Unit</div>
            <div className="col-span-2 text-right">Last Updated</div>
          </div>
          <div className="divide-y divide-neutral-border dark:divide-gray-800">
            {loading ? (
              <LoadingSpinner title="ingredients" />
            ) : (
              paginatedIngredients.map((ingredient) => (
                <InventoryRow
                  key={ingredient.id}
                  ingredient={ingredient}
                  onClick={() => handleEditClick(ingredient)}
                />
              ))
            )}

            {!loading && filteredIngredients.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 px-4 bg-white dark:bg-background-dark rounded-2xl border-2 border-dashed border-neutral-border dark:border-gray-800 transition-all">
                <div className="w-20 h-20 bg-neutral-surface dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-4xl text-neutral-text-secondary opacity-50">
                    inventory_2
                  </span>
                </div>

                <h3 className="text-xl font-black text-neutral-text-main dark:text-white tracking-tight">
                  No ingredients found
                </h3>
                {(searchName || selectedCategory) && (
                  <p className="mt-2 text-sm text-neutral-text-secondary text-center max-w-[280px]">
                    We couldn't find anything matching "
                    <span className="font-bold text-primary">{searchName}</span>
                    "
                    {selectedCategory && (
                      <>
                        {" "}
                        in <span className="font-bold">{selectedCategory}</span>
                      </>
                    )}
                  </p>
                )}
              </div>
            )}
          </div>

          <InventoryPagination
            currentPage={currentPage}
            totalItems={filteredIngredients.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>

      <AddIngredientDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedIngredient(null);
        }}
        editData={selectedIngredient}
        categories={categories}
        onSaveSuccess={fetchIngredients}
      />
    </div>
  );
};

export default InventoryPage;
