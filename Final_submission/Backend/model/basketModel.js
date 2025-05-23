// Import built-in Node.js modules
import fs from "fs";        // 'fs' lets read/write files (file system)
import path from "path";

class BasketModel {
  constructor() {
    this.dbPath = path.join(process.cwd(), "DB/database.json");  // save path to data.json
  }

  getBasket(customerId) {
    // Converts the file string into an object
    const db = JSON.parse(fs.readFileSync(this.dbPath, "utf-8"));
    return db.baskets.find(basket => basket.customer_id === customerId); // Looks for the basket that matches the user ID
  }


  // Update basket quantities or remove products (if quantity = 0)
 updateBasket(customerId, items) {
  const db = JSON.parse(fs.readFileSync(this.dbPath, "utf-8"));
  let basket = db.baskets.find(b => b.customer_id === customerId);

  if (!basket) {
    const newBasket = { customer_id: customerId, items: [] };
    db.baskets.push(newBasket);
    basket = newBasket;
  }

  items.forEach(update => {
    const existingItemIndex = basket.items.findIndex(
      item => item.product_id === update.product_id && item.size === update.size
    );

    if (update.quantity === 0) {
      if (existingItemIndex !== -1) {
        basket.items.splice(existingItemIndex, 1);
      }
    } else {
      if (existingItemIndex !== -1) {
        basket.items[existingItemIndex].quantity = update.quantity;
      } else {
        basket.items.push({ 
          product_id: update.product_id, 
          size: update.size, 
          quantity: update.quantity 
        });
      }
    }
  });

  fs.writeFileSync(this.dbPath, JSON.stringify(db, null, 2));
  return basket;
}

  // Remove a specific product from the customer's basket (reduce by 1 or remove if quantity is 1)
  removeProductFromBasket(customerId, productId, size) {
  const db = JSON.parse(fs.readFileSync(this.dbPath, "utf-8"));
  const basket = db.baskets.find(b => b.customer_id === customerId);

  if (!basket) return null;

  const existingItemIndex = basket.items.findIndex(
    item => item.product_id === productId && item.size === size
  );

  if (existingItemIndex === -1) return null;

  const existingItem = basket.items[existingItemIndex];

  if (existingItem.quantity > 1) {
    existingItem.quantity -= 1;
  } else {
    basket.items.splice(existingItemIndex, 1);
  }

  fs.writeFileSync(this.dbPath, JSON.stringify(db, null, 2));
  return basket;
}


//clears all items in basket for a customer
  clearBasket(customerId) {
  const db = JSON.parse(fs.readFileSync(this.dbPath, "utf-8"));
  const basket = db.baskets.find(b => b.customer_id === customerId);

  if (!basket) return null;

  basket.items = []; // Clear all items from the basket

  fs.writeFileSync(this.dbPath, JSON.stringify(db, null, 2));
  return basket;
}

  // (Optional) Add a product to a customer's basket — unused in updated routes
  addProductToBasket(customerId, productId, quantity) {
    const db = JSON.parse(fs.readFileSync(this.dbPath, "utf-8"));
    const basket = db.baskets.find(b => b.customer_id === customerId);

    if (!basket) return null;

    const existingItem = basket.items.find(item => item.product_id === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      basket.items.push({ product_id: productId, quantity });
    }

    fs.writeFileSync(this.dbPath, JSON.stringify(db, null, 2));
    return basket;
  }


  createEmptyBasket(customerId) {
    const db = JSON.parse(fs.readFileSync(this.dbPath, "utf-8"));

    // Check if basket already exists for customerId
    if (!db.baskets.find(basket => basket.customer_id === customerId)) {
      db.baskets.push({
        customer_id: customerId,
        items: []
      });

      fs.writeFileSync(this.dbPath, JSON.stringify(db, null, 2));
    }

    return true;
  }
}

export default BasketModel;
