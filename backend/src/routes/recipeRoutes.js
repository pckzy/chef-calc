import express from 'express';
import { createRecipe, getCategories, removeRecipe } from '../controllers/recipeController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createRecipe);
router.get('/categories', authenticate, getCategories);
router.delete("/:id", authenticate, removeRecipe);

export default router;