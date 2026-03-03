import express from 'express';
import { createRecipe, getCategories } from '../controllers/recipeController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createRecipe);
router.get('/categories', authenticate, getCategories);

export default router;