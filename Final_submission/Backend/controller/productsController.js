import ProductModel from "../model/productModel.js";
const model = new ProductModel();


// POST /products – create a new product
export async function createProduct(req, res){
    try {
      const newProduct = await model.createProduct(req.body);
      res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }


// GET all /products - retrieve all available products
/*
export async function getAllProducts(req, res){
    try{
        const products = await model.getAllProducts();
        res.status(200).json(products);
    } catch (error){
        res.status(500).json({ error: `Could not retrieve products: ${error.message}` });
    }
}
    */

export async function getFilteredProducts(req, res) {
  try {
    let { cuisines, types } = req.query;

    if (typeof cuisines === "string") {
      cuisines = cuisines.split(",").map((c) => c.trim());
    } else {
      cuisines = [];
    }

    if (typeof types === "string") {
      types = types.split(",").map((t) => t.trim());
    } else {
      types = [];
    }

    const products = await model.getProductsByFilters(cuisines, types);

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ error: "No products found matching filters" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to retrieve products: ${error.message}` });
  }
}


// GET /products/:id – retrieve the details for a specific product
export async function getProductById(req, res) {
  try {
    const product = await model.getProductById(req.params.id); // looks for a product where product.product_id = the value passed in the URL
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) { // if something unexpected goes wrong (e.g. reading the file fails), respond with a 500 internal server error
    res.status(500).json({ error: `Could not retrieve product: ${error.message}` });
  }
}


// PUT /products/:id – update the details of a specific product if it exists
export async function updateProduct(req, res)  {
    try {
      const success = await model.updateProduct(req.params.id, req.body); // looks for a product with the ID and tries to update it with new data from the request
      if (success) {
        res.status(200).json({ message: 'Product updated successfully' });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) { // if something unexpected goes wrong (e.g. reading the file fails), respond with a 500 internal server error
      res.status(500).json({ error: `Could not update product: ${error.message}` });
    }
  }


// DELETE /products/:id – remove a specific product
export async function deleteProduct(req, res){
    try {
      const success = await model.deleteProduct(req.params.id); // tries to find and remove product with the given ID from the database
      if (success) {
        res.status(200).json({ message: 'Product deleted successfully' });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) { // if something unexpected goes wrong (e.g. reading the file fails), respond with a 500 internal server error
      res.status(500).json({ error: `Could not delete product: ${error.message}` });
    }
  }

  