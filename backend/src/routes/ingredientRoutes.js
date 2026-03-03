import express from "express";
import {
  getCategories,
  getIngredients,
  createIngredient,
  updateIngredient,
} from "../controllers/ingredientController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, getIngredients);
router.post("/", authenticate, createIngredient);
router.put("/:id", authenticate, updateIngredient);
router.get("/categories", authenticate, getCategories);

export default router;
