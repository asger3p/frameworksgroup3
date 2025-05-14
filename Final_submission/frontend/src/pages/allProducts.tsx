import React, { useEffect, useState } from "react";
import ProductFilter from "../components/allproducts/ProductFilter.tsx";
import ProductGrid from "../components/allproducts/productGrid";
import { Product, CuisineType, ProductTypeCategory } from "../types/product";

// AllProductsPage component to display all products with filtering options
const AllProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<CuisineType[]>([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<
    ProductTypeCategory[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from the API
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Toggle selected cuisines and product types
  const toggleCuisine = (cuisine: CuisineType) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  // Toggle selected product types
  const toggleProductType = (type: ProductTypeCategory) => {
    setSelectedProductTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Filter products based on selected cuisines and product types
  const filteredProducts = products.filter((product) => {
    const isCuisineMatch =
      selectedCuisines.length === 0 ||
      product.cuisine.some(cuisine => selectedCuisines.includes(cuisine));

    const isProductTypeMatch =
      selectedProductTypes.length === 0 ||
      selectedProductTypes.includes(product.type);

    return isCuisineMatch && isProductTypeMatch;
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <ProductFilter
            selectedCuisines={selectedCuisines}
            selectedProductTypes={selectedProductTypes}
            onCuisineChange={toggleCuisine}
            onProductTypeChange={toggleProductType}
          />
        </div>
        <div className="col-md-9">
          {loading && <p>Loading products...</p>}
          {error && <p className="text-danger">Error: {error}</p>}
          {!loading && !error && (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;