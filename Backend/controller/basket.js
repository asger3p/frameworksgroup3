import { Router } from 'express';
import basketModel from "../model/basketModel.js"; // imports model file so that the controller can use the functions defined in basketModel.js
const model = new basketModel()

const router = Router();

// GET a user's basket
router.get("/:customerId", async (req, res) => {
  const customerId = req.params.customerId;
  try {
    const basket = model.getBasket(customerId);

    if (!basket) {
      return res.status(404).json({ error: `Basket not found for customer ID ${customerId}` });
    }

    res.status(200).json(basket); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve basket" });
  }  
});

// PUT: update quantities or remove products (if quantity = 0)
router.put("/:customerId", async (req, res) => {
  const customerId = req.params.customerId;
  const items = req.body.items;

  try {
    const updatedBasket = await model.updateBasket(customerId, items); 

    if (!updatedBasket) {
      return res.status(404).json({ error: `Could not update basket for customer ${customerId}` });
    }

    res.status(200).json(updatedBasket); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update basket" });
  }  
});

// DELETE: remove a specific product, productId comes from body
router.delete("/:customerId", async (req, res) => {
  const customerId = req.params.customerId;
  const { productId } = req.body;

  try {
    const updatedBasket = await model.removeProductFromBasket(customerId, productId);

    if (!updatedBasket) {
      return res.status(404).json({ error: `Product not found in basket for user ${customerId}`});
    } 

    res.status(200).json(updatedBasket); 
  } catch(error) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove product from basket" });
  }
});

export default router;

  

