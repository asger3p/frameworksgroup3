import fs from "fs";

export default class ProductModel {
  getAllProducts() {
    const db = JSON.parse(fs.readFileSync("database", "utf-8"));
    return db["products"];
  }

  createProduct(body) {
    const {
      product_id,
      name,
      subheading,
      description,
      image,
      cuisine,
      type,
      sizes,
    } = body;

    //validation that it recieves the correct parameters
    if (
      !product_id ||
      !name ||
      !description ||
      !image ||
      !cuisine ||
      !type ||
      !Array.isArray(sizes)
    ) {
      throw new Error("Missing required fields or invalid format");
    }
    //validating variable-types for sizes
    const validSizes = sizes.every(
      (s) => typeof s.size === "string" && typeof s.price === "number"
    );
    if (!validSizes) {
      throw new Error(
        "Each size must be an object with a string size and numeric price"
      );
    }

    //creating a link
    const link = `/Frontend/pages/product_description_generel.html?productId=${product_id}`;

    //creating a db variable
    const db = JSON.parse(fs.readFileSync("database", "utf-8"));

    //creating a new product
    const newProduct = {
      product_id,
      name,
      subheading: subheading || "",
      description,
      image,
      link,
      cuisine: Array.isArray(cuisine) ? cuisine : [],
      type,
      sizes,
    };

    // Push new product into memory
    db.products.push(newProduct);
    // Write to the file
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    return newProduct;
  }

  getProductById(Id) {
    if (!Id) {
      throw new Error("Missing required fields or invalid format");
    }

    // Creating a db variable and reading the JSON file
    const db = JSON.parse(fs.readFileSync("database", "utf-8"));

    // Find the product with the matching id
    const product = db.products.find((product) => product.product_id === Id);

    return product; //obs returns undefined if no product is found
  }

  updateProduct(id, body) {
    if (!id) {
      throw new Error("Missing required fields or invalid format");
    }

    const {
      product_id,
      name,
      subheading,
      description,
      image,
      cuisine,
      type,
      sizes,
    } = body;

    // Validate that sizes is an array
    if (sizes && !Array.isArray(sizes)) {
      throw new Error("Sizes must be an array");
    }

    // Validate the variable-types for sizes, if sizes is present
    if (sizes) {
      const validSizes = sizes.every(
        (s) => typeof s.size === "string" && typeof s.price === "number"
      );
      if (!validSizes) {
        throw new Error(
          "Each size must be an object with a string size and numeric price"
        );
      }
    }

    //creating a link
    const link = `/Frontend/pages/product_description_generel.html?productId=${id}`;

    //creating a db variable
    const db = JSON.parse(fs.readFileSync("database", "utf-8"));

    // Find the product with the matching id
    const product = db.products.find((product) => product.product_id === id);
    if (!product) {
      throw new Error("Product not found");
    }

    // Only update if new data is provided
    const updatedProduct = {
      ...product,
      product_id: product_id || product.product_id,
      name: name || product.name,
      subheading: subheading || product.subheading,
      description: description || product.description,
      image: image || product.image,
      cuisine: cuisine || product.cuisine,
      type: type || product.type,
      sizes: sizes || product.sizes,
      link,
    };

    // Find the index of the product to update
    const productIndex = db.products.findIndex(
      (product) => product.product_id === id
    );

    // Replace the old product with the updated one
    db.products[productIndex] = updatedProduct;

    // Save the updated database
    fs.writeFileSync("database", JSON.stringify(db, null, 2), "utf-8");

    return true;
  }

  deleteproduct(id) {
    if (!id) {
      throw new Error("Missing required fields or invalid format");
    }

    //creating a db variable
    const db = JSON.parse(fs.readFileSync("database", "utf-8"));

    // Find the index of the product to delete
    const productIndex = db.products.findIndex(
      (product) => product.product_id === id
    );
    if (productIndex === -1) {
      throw new Error("Product not found");
    }

    // Remove the product from the array
    db.products.splice(productIndex, 1); //removes exactly 1 the product at productindex

    // Write back to the file
    fs.writeFileSync("database", JSON.stringify(db, null, 2), "utf-8");

    return true;
  }
}

export { ProductModel };
