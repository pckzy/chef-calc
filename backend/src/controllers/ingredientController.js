import { supabase } from '../config/supabaseClient.js';

export const getCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("ingredient_categories")
      .select("id, name")
      .order("name", { ascending: true });

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getIngredients = async (req, res) => {
  try {
    const user_id = req.user.id;

    const { data, error } = await supabase
      .from('ingredients')
      .select(`
        *,
        ingredient_categories (name)
      `)
      .eq('user_id', user_id)
      .order('updated_at', { ascending: false });

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const createIngredient = async (req, res) => {
  const { name, category_id, purchase_price, unit, image_url } = req.body;
  const user_id = req.user.id;

  try {
    const { data, error } = await supabase
      .from('ingredients')
      .insert([
        { 
          name, 
          category_id, 
          purchase_price: parseFloat(purchase_price), 
          unit, 
          image_url,
          user_id 
        }
      ])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateIngredient = async (req, res) => {
  const { id } = req.params;
  const { name, category_id, purchase_price, unit, image_url } = req.body;
  const user_id = req.user.id;

  try {
    const { data, error } = await supabase
      .from('ingredients')
      .update({
        name,
        category_id,
        purchase_price: parseFloat(purchase_price),
        unit,
        image_url,
        updated_at: new Date()
      })
      .eq('id', id)
      .eq('user_id', user_id)
      .select();

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ error: "Ingredient not found or unauthorized" });
    }

    res.status(200).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};