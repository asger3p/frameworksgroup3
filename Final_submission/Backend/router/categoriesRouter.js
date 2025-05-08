import { Router } from 'express';
import * as categoryController from '../controller/categoriesController.js';

const router = Router();

router.get('/', categoryController.getAllCategories);
router.get('/:categoryName', categoryController.getProductsByCategory);

export default router;
