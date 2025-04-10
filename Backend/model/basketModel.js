// Import built-in Node.js modules
import { readFileSync, writeFileSync } from "fs";           // 'fs' lets read/write files (file system)
import { join, dirname } from "path";

class BasketModel {
    constructor() {
      this.dbPath = join(dirname( "../DB/database.json")); //Saves the path to data.json in the model
    }
  
    async getBasket(customerId) {
        //Converts the file string into an object
      const db = JSON.parse(readFileSync(this.dbPath, "utf-8"));
      return db.baskets.find(basket => basket.customer_id === customerId); //Looks for the basket that matches the user ID
    }

  // Update basket quantities or remove products (if quantity = 0)
  updateBasket(customerId, items) {
    const db = JSON.parse(fs.readFileSync(this.dbPath, "utf-8"));
    const basket = db.baskets.find(b => b.customer_id === customerId);

    if (!basket) return null;

    items.forEach(update => {
      const existingItemIndex = basket.items.findIndex(item => item.productId === update.productId);

      if (update.quantity === 0) {
        // Remove the product completely
        if (existingItemIndex !== -1) {
          basket.items.splice(existingItemIndex, 1);
        }
      } else {
        if (existingItemIndex !== -1) {
          // Update quantity
          basket.items[existingItemIndex].quantity = update.quantity;
        } else {
          // Add new product
          basket.items.push({ productId: update.productId, quantity: update.quantity });
        }
      }
    });

    fs.writeFileSync(this.dbPath, JSON.stringify(db, null, 2));
    return basket;
  }

  // Remove a specific product from the customer's basket (reduce by 1 or remove if quantity is 1)
  removeProductFromBasket(customerId, productId) {
    const db = JSON.parse(fs.readFileSync(this.dbPath, "utf-8"));
    const basket = db.baskets.find(b => b.customer_id === customerId);

    if (!basket) return null;

    const existingItemIndex = basket.items.findIndex(item => item.productId === productId);
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

  // (Optional) Add a product to a customer's basket — unused in updated routes
  addProductToBasket(customerId, productId, quantity) {
    const db = JSON.parse(fs.readFileSync(this.dbPath, "utf-8"));
    const basket = db.baskets.find(b => b.customer_id === customerId);

    if (!basket) return null;

    const existingItem = basket.items.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      basket.items.push({ productId, quantity });
    }

    fs.writeFileSync(this.dbPath, JSON.stringify(db, null, 2));
    return basket;
  }
}

  export default BasketModel;