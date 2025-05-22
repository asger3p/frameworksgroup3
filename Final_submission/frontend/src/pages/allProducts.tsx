import React, { useEffect, useState } from "react";
import ProductFilter from "../components/allproducts/productFilter";
import ProductGrid from "../components/allproducts/productGrid";
import { Product } from "../types/product";

const AllProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [availableCuisines, setAvailableCuisines] = useState<string[]>([]);
  const [availableProductTypes, setAvailableProductTypes] = useState<string[]>(
    []
  );

  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>(
    []
  );

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch filter categories");
        return res.json();
      })
      .then((data) => {
        setAvailableCuisines(data.categories.cuisines || []);
        setAvailableProductTypes(data.categories.types || []);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const query = new URLSearchParams();
    if (selectedCuisines.length)
      query.append("cuisines", selectedCuisines.join(","));
    if (selectedProductTypes.length)
      query.append("types", selectedProductTypes.join(","));

    fetch(`http://localhost:3000/products?${query.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedCuisines, selectedProductTypes]);

  const handleFilterChange = (
    newSelectedCuisines: string[],
    newSelectedProductTypes: string[]
  ) => {
    setSelectedCuisines(newSelectedCuisines);
    setSelectedProductTypes(newSelectedProductTypes);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <ProductFilter
            selectedCuisines={selectedCuisines}
            selectedProductTypes={selectedProductTypes}
            availableCuisines={availableCuisines}
            availableProductTypes={availableProductTypes}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="col-md-9">
          {loading && <p>Loading products...</p>}
          {error && <p className="text-danger">Error: {error}</p>}
          {!loading && !error && <ProductGrid products={products} />}
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;
