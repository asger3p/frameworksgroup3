import basketModel from "../model/basketModel.js";
const model = new basketModel()

// GET a user's basket
export async function getBasket(req, res){
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
}

// PUT: update quantities or remove products (if quantity = 0)
export async function updateBasket(req, res){
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
}

// DELETE: remove a specific product, productId comes from body
export async function removeProductFromBasket(req, res){
  const customerId = req.params.customerId;
  const productId = req.params.productId;

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
}

  

