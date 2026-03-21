import { supabase } from "../config/supabaseClient.js";

const getPricePerUnit = (purchasePrice, purchaseUnit, recipeUnit) => {
  const pUnit = purchaseUnit?.toLowerCase();
  const rUnit = recipeUnit?.toLowerCase();

  if (pUnit === "kg" && rUnit === "g") {
    return purchasePrice / 1000;
  }

  if ((pUnit === "l" || pUnit === "litre") && rUnit === "ml") {
    return purchasePrice / 1000;
  }

  return purchasePrice;
};

export const getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: rawIngredients } = await supabase
      .from("ingredients")
      .select("*, ingredient_categories(name)")
      .eq("user_id", userId);

    const { data: rawRecipes, error: errRec } = await supabase
      .from("recipes")
      .select(`
        *,
        recipe_categories ( name ),
        recipe_ingredients (
          qty,
          unit,
          ingredients ( purchase_price, unit ) 
        )
      `)
      .eq("user_id", userId);

    if (errRec) throw errRec;

    const revenueData = (rawRecipes || []).map((recipe) => {
      
      const currentFoodCost = recipe.recipe_ingredients?.reduce((sum, ri) => {
        const purchasePrice = Number(ri.ingredients?.purchase_price || 0);
        const purchaseUnit = ri.ingredients?.unit;
        const recipeUnit = ri.unit;
        const quantity = Number(ri.qty || 0);

        const pricePerSmallUnit = getPricePerUnit(purchasePrice, purchaseUnit, recipeUnit);
        
        return sum + (pricePerSmallUnit * quantity);
      }, 0) || 0;
      
      const sellingPrice = Number(recipe.actual_selling_price || 0);
      const profit = sellingPrice - currentFoodCost;
      const margin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;

      return {
        id: recipe.id,
        name: recipe.name,
        category: recipe.recipe_categories?.name || "Uncategorized",
        cost: Number(currentFoodCost.toFixed(2)),
        sellingPrice: Number(sellingPrice.toFixed(2)),
        profit: Number(profit.toFixed(2)),
        margin: Number(margin.toFixed(2)),
        image: recipe.image_url,
      };
    });

    res.status(200).json({
      stats: {
        totalIngredients: rawIngredients?.length || 0,
        activeRecipes: rawRecipes?.length || 0,
        avgSellingPrice: rawRecipes?.length > 0 
          ? (revenueData.reduce((s, r) => s + r.sellingPrice, 0) / rawRecipes.length).toFixed(2) 
          : 0
      },
      revenueData,
      categoryData: Object.entries(
        revenueData.reduce((acc, r) => {
          acc[r.category] = (acc[r.category] || 0) + r.cost;
          return acc;
        }, {})
      ).map(([name, value]) => ({ name, value: Number(value.toFixed(2)) })),
      ingredientCostData: Object.entries(
        rawIngredients?.reduce((acc, i) => {
          const cat = i.ingredient_categories?.name || "Other";
          acc[cat] = (acc[cat] || 0) + Number(i.purchase_price || 0);
          return acc;
        }, {})
      ).map(([name, cost]) => ({ name, cost: Number(cost.toFixed(2)) }))
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};