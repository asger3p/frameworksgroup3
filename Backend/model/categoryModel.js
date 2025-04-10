import fs from "fs";
import path from "path";

export default class categoryModel {
    constructor() {
      this.dbPath = path.join(process.cwd(), "DB/database.json");  // save path to data.json
  }

  getAllCategories() {
    //creating a db variable
    const db = JSON.parse(fs.readFileSync(this.dbPath, "utf-8"));

    const types = new Set();
    const cuisines = new Set();

    db.products.forEach(product => {

      // Add type to the Set if it exists
      if (product.type) {
          types.add(product.type);
      }

      // Add each cuisine to the Set if it exists
      if (product.cuisine) {
          product.cuisine.forEach(cuisine => {
              cuisines.add(cuisine);
          });
      }
  });

  // Convert the Set objects into arrays
    const allCategories = {
      types: Array.from(types),
      cuisines: Array.from(cuisines)
    };
   return allCategories;
  }

  getProductsByCategory(category) {
    if(!category) {
      throw new Error("Missing required fields or invalid format");
    }
     //creating a db variable
     const db = JSON.parse(fs.readFileSync(this.dbPath, "utf-8"));

     // Filter products that contain the specified category in their cuisine array
     const filteredProducts = db.products.filter(product => 
      product.cuisine.includes(category) || product.type === category);
  
    // Return the filtered products
    return filteredProducts;

  }
}
export { categoryModel };