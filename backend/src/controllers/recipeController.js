import { supabase } from "../config/supabaseClient.js";

export const createRecipe = async (req, res) => {
  try {
    const { recipe, ingredients, summary } = req.body;

    const userId = req.user.id;

    const { data: newRecipe, error: recipeError } = await supabase
      .from("recipes")
      .insert([
        {
          user_id: userId,
          category_id: recipe.categoryId || null,
          name: recipe.name,
          image_url: recipe.image_url,
          note: recipe.note,
          actual_selling_price: summary.actualSellingPrice,
          actual_spend_price: summary.totalSpendPrice,
          margin: summary.actualMarginPercent,
        },
      ])
      .select()
      .single();

    if (recipeError) throw recipeError;

    const ingredientsToInsert = ingredients.map((ing) => ({
      recipe_id: newRecipe.id,
      ingredient_id: ing.id,
      qty: ing.qty,
      unit: ing.unit,
      calculated_price: ing.calculatedCost,
    }));

    const { error: ingError } = await supabase
      .from("recipe_ingredients")
      .insert(ingredientsToInsert);

    if (ingError) {
      await supabase.from("recipes").delete().eq("id", newRecipe.id);
      throw ingError;
    }

    res.status(201).json({
      message: "Recipe published successfully",
      id: newRecipe.id,
    });
  } catch (error) {
    console.error("Create Recipe Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("recipe_categories")
      .select("id, name")
      .order("name", { ascending: true });

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
