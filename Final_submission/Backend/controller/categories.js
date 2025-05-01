import { Router } from 'express';
import categoryModel from '../model/categoryModel.js';
const model = new categoryModel();

const router = Router();

router.get('/', async (req, res) => {
    try {
        const categories = await model.getAllCategories();
        if (categories && (categories.types.length > 0 || categories.cuisines.length > 0)) {
        res.status(200).json({ categories });
      } else {
        res.status(404).json({ error: 'No categories found' });
      }
    } catch (error) {
      res.status(500).json({ error: `Failed to retrieve categories: ${error.message}` });
    }
  });

  router.get('/:categoryName', async (req, res) => {
    const { categoryName } = req.params;
    try {
      const products = await model.getProductsByCategory(categoryName);
      if (products.length > 0) {
        res.status(200).json({ products });
      } else {
        res.status(404).json({ error: `No products found in category "${categoryName}"` });
      }
    } catch (error) {
      res.status(500).json({ error: `Failed to retrieve products: ${error.message}` });
    }
  });
  
  export default router;