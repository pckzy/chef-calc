import { useState, useEffect } from "react";
import api from "../lib/axios";
import supabase from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/layout/Navbar";
import Header from "../components/layout/Header";
import Button from "../components/common/Button";
import RecipeDetail from "../components/recipes/RecipeDetail";
import RecipeIngredient from "../components/recipes/RecipeIngredient";
import RecipeSummary from "../components/recipes/RecipeSummary";

const INITIAL_RECIPE_STATE = {
  name: "",
  categoryId: "",
  note: "",
  image_url: "",
};
const INITIAL_SUMMARY_STATE = {
  actualSellingPrice: 0,
  totalSpendPrice: 0,
  actualMarginPercent: 0,
};

const RecipePage = () => {
  const navigate = useNavigate();
  const [isPublishing, setIsPublishing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [recipeData, setRecipeData] = useState(INITIAL_RECIPE_STATE);

  const [ingredients, setIngredients] = useState([]);

  const [summaryData, setSummaryData] = useState(INITIAL_SUMMARY_STATE);

  const handlePublishRecipe = async () => {
    if (!recipeData.name) return toast.error("Please enter a recipe name.");
    if (!recipeData.categoryId) return toast.error("Please select category.");
    if (ingredients.length === 0)
      return toast.error("Please add at least one ingredient.");

    setIsPublishing(true);
    let finalImageUrl = recipeData.image_url;

    try {
      if (selectedFile) {
        const fileExt = selectedFile.name.split(".").pop();
        const filePath = `recipes/${Date.now()}_${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("recipes")
          .upload(filePath, selectedFile);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("recipes")
          .getPublicUrl(filePath);
        finalImageUrl = data.publicUrl;
      }

      const payload = {
        recipe: { ...recipeData, image_url: finalImageUrl },
        ingredients: ingredients,
        summary: summaryData,
      };

      await api.post("/recipes", payload);

      toast.success("Successfully published!");
      if (selectedFile && recipeData.image_url.startsWith("blob:")) {
        URL.revokeObjectURL(recipeData.image_url);
      }

      setRecipeData(INITIAL_RECIPE_STATE);
      setIngredients([]);
      setSummaryData(INITIAL_SUMMARY_STATE);
      setSelectedFile(null);

      navigate("/recipes");
    } catch (error) {
      console.error("Error publishing recipe:", error);
      toast.error("Failed to publish recipe. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("recipes/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="bg-background-light dark:bg-background-dark h-screen text-neutral-text-main dark:text-gray-100 flex flex-col font-display overflow-hidden">
      <Navbar />

      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full flex flex-col overflow-y-auto lg:overflow-hidden">
        <div className="shrink-0 mb-6 lg:mb-0">
          <Header
            title="New Recipe"
            description="Create a new dish and calculate margins instantly."
          >
            <Button
              label={isPublishing ? "Publishing..." : "Publish Recipe"}
              color="bg-primary"
              onClick={!isPublishing ? handlePublishRecipe : undefined}
              disabled={isPublishing}
            />
          </Header>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 lg:min-h-0">
          <div className="lg:col-span-3 flex flex-col gap-6 lg:h-full lg:min-h-0">
            <RecipeDetail
              recipeData={recipeData}
              setRecipeData={setRecipeData}
              categories={categories}
              setSelectedFile={setSelectedFile}
            />
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6 z-50 relative lg:min-h-0">
            <RecipeIngredient
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
          </div>

          <div className="lg:col-span-3 flex flex-col lg:h-full lg:min-h-0">
            <RecipeSummary
              summaryData={summaryData}
              setSummaryData={setSummaryData}
              ingredients={ingredients}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipePage;
