const basketModel = require("../models/basketModel"); // imports model file so that the controller can use the functions defined in basketModel.js

const getBasket = (req, res) => { 
    const userId = req.params.userId; // // Get the userId from the URL path
  
    try {
      const basket = basketModel.getBasket(userId);
  
      if (!basket) {
        return res.status(404).json({ error: "Basket not found for user ID ${userId}" });
      }
  
      res.status(200).json(basket);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve basket" });
    }
  };

  const deleteBasket = (req, res) => {
    const userId = req.params.userId;
  
    try {
      const updatedBasket = basketModel.deleteBasket(userId);
  
      if (!updatedBasket) {
        return res.status(404).json({ error: "Basket not found for user ${userId}" });
      }
  
      res.status(200).json(updatedBasket);
  
    } catch (error) {
      res.status(500).json({ error: "Failed to delete basket" });
    }
  };

  const addProductToBasket = (req, res) => { // add a product to basket

    const userId = req.params.userId;
    const productId = req.params.productId;
    const { quantity = 1 } = req.body; // default to 1 if not provided
  
    try {
      const updatedBasket = basketModel.addProductToBasket(userId, productId, quantity);
      res.status(200).json(updatedBasket);
    } catch (error) {
      res.status(500).json({ error: "Failed to add product to basket" });
    }
  };

  const removeProductFromBasket = (req, res) => { // delete a product from basket
    const userId = req.params.userId;
    const productId = req.params.productId;
  
    try {
      const updatedBasket = basketModel.removeProductFromBasket(userId, productId);
      
      if (!updatedBasket) {
        return res.status(404).json({ error: "Product not found in basket for user ${userId}" });
      }
  
      res.status(200).json(updatedBasket);
    } catch (error) {
      res.status(500).json({ error: "Failed to remove product from basket" });
    }
  };

  const updateProductQuantity = (req, res) => { // updates the quantity of a specific product in a user's basket
    const userId = req.params.userId;
    const productId = req.params.productId;
    // Get the quantity from the body of the request
    const { quantity } = req.body;
  
    // Check that the quantity is a number and not negative
    // If not, send back a 400
    if (typeof quantity !== "number" || quantity < 0) {
      return res.status(400).json({ error: "Quantity must be a non-negative number" });
    }
  
    try {
        // Ask the model to update the quantity for this product in this user's basket
      const updatedBasket = basketModel.updateProductQuantity(userId, productId, quantity);
  
      // If nothing was updated (e.g. product doesn't exist), return 404
      if (!updatedBasket) {
        // If successful, return the updated basket
        return res.status(404).json({ error: "Product not found in basket" });
      }
  
      res.status(200).json(updatedBasket);
    } catch (error) {
      res.status(500).json({ error: "Failed to update product quantity" });
    }
  };
  
  
  module.exports = {
    getBasket,
    deleteBasket,
    addProductToBasket,
    removeProductFromBasket,
    updateProductQuantity
  }; // exports all the controller functions, so others files are able to use the controller
  
  
  

