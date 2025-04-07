const express = require('express');
const basketModel = require("../models/basketModel"); // imports model file so that the controller can use the functions defined in basketModel.js
const model = new basketModel()

const router = express.Router();

// GET a user's basket
router.get("/baskets/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const basket = await model.getBasket(userId)

    if (!basket) {
      return res.status(404).json({ error: `Basket not found for user ID ${userId}` });
    }

    res.status(200).json(basket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve basket" });
  }  
});

// DELETE entire basket
router.delete("/baskets/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const deletedBasket = await model.deleteBasket(userId)

    if (!deletedBasket) {
      return res.status(404).json({ error: `Basket not found for user ID ${userId}` });
    }

    res.status(200).json(deletedBasket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete basket" });
  }  
});

// POST - Add product to basket
router.post("/baskets/:userId/products/:productId", async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity = 1 } = req.body;

  try {
    const updatedBasket = await model.addProductToBasket(userId, productId, quantity);

    if (!updatedBasket) {
      return res.status(404).json({ error: `Could not add product ${productId} to basket for user ${userId}` });
    }

    res.status(200).json(updatedBasket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete basket" });
  }  
});

// DELETE - Remove product from basket
router.delete("/baskets/:userId/products/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const updatedBasket = await model.removeProductFromBasket(userId, productId);

    if(!updatedBasket) {
      return res.status(404).json({ error: `Product not found in basket for user ${userId}`});
    } 
    res.status(200).json(updatedBasket);
  } catch(error) {
      console.error(error);
      res.status(500).json({ error: "Failed to remove product from basket" });
    }
});

/*
// PUT - Update product quantity in basket
router.post("/baskets/:userId/products/:productId", async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  if (typeof quantity !== "number" || quantity < 0) {
    return res.status(400).json({ error: `Quantity must be a non-negative number` });
  }

  try {
    const updatedBasket = await model.updateProductQuantity(userId, productId, quantity)

    if (!updatedBasket) {
      // If successful, return the updated basket
      return res.status(404).json({ error: "Product not found in basket" });
    }

    res.status(200).json(updatedBasket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product quantity" });
  }  
});*/

module.exports = router;

  

