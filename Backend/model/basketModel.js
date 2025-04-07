// Import built-in Node.js modules
const fs = require("fs");           // 'fs' lets read/write files (file system)
const path = require("path");       // 'path' helps build safe file paths

class BasketModel {
    constructor() {
      this.dbPath = path.join(__dirname, "../db/data.json"); //Saves the path to data.json in the model
    }
  
    async getBasket(userId) {
        //Converts the file string into an object
      const db = JSON.parse(fs.readFileSync(this.dbPath, "utf-8"));
      return db.baskets.find(basket => basket.userId === userId); //Looks for the basket that matches the user ID
    }

    deleteBasket(userId) {
        const db = JSON.parse(fs.readFileSync(this.dbPath, "utf-8"));
        const basketIndex = db.baskets.findIndex(b => b.userId === userId);
      
        if (basketIndex === -1) return null;
      
        const deletedBasket = db.baskets.splice(basketIndex, 1)[0];
      
        fs.writeFileSync(this.dbPath, JSON.stringify(db, null, 2));
        return deletedBasket;
      }

    addProductToBasket(userId, productId, quantity) {
        const db = JSON.parse(fs.readFileSync(this.dbPath, "utf-8"));
        //find the user's basket
        const basket = db.baskets.find(b => b.userId === userId);

        if (!basket) return null; // If basket doesn't exist, return null

         //check if product already exists in basket
        const existingItem = basket.items.find(item => item.productId === productId);

        if(existingItem) {
            //if product is already in the basket, increase the quantity
            existingItem.quantity += quantity;
        } else {
            //if it is a new product, add it to the basket
            basket.items.push({ productId, quantity });
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(db, null, 2));
        return basket;

      }
      
    removeProductFromBasket(userId, productId, quantity) {
        const db = JSON.parse(fs.readFileSync(this.dbPath, "utf-8"));
        const basket = db.baskets.find(b => b.userId === userId);

        if (!basket) return null;

        const existingItemIndex = basket.items.findIndex(item => item.productId === productId);

        if (existingItemIndex === -1) {
            return null; // product not found in the basket
          }
          
          const existingItem = basket.items[existingItemIndex];

        if (existingItem.quantity > 1) {
            existingItem.quantity -= 1; // decrease by 1
          } else {
            basket.items.splice(existingItemIndex, 1); // remove item completely
          }
        
          fs.writeFileSync(this.dbPath, JSON.stringify(db, null, 2));
          return basket;
        }
  }

  module.exports = BasketModel;