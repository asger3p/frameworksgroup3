const express = require("express"); // import Express framework
const fs = require("fs"); // file system module to read/write files
const path = require("path"); // path module to build safe file paths
const router = express.Router(); // create a new Express router

// build the correct path to product.json
const DATA_PATH = path.join(__dirname, "..", "products.json");

// GET /products – return the full list of products
router.get("/", (req, res) => {
  fs.readFile(DATA_PATH, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading products.json:", err);
      return res.status(500).json({ error: "Could not load product data." });
    }

    try {
      const parsedData = JSON.parse(data); // convert file content to JS object
      res.json(parsedData.products); // send only the "products" array
    } catch (parseErr) {
      console.error("Error parsing products.json:", parseErr);
      res.status(500).json({ error: "Corrupted products data" });
    }
  });
});

module.exports = router; // export the router so app.js can use it