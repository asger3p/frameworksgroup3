// AllProductsPage.tsx
import React, { useEffect, useState } from "react";
import ProductFilter from "../components/allproducts/productFilter";
import ProductGrid from "../components/allproducts/productGrid";
import { Product, CuisineType, ProductTypeCategory } from "../types/product";

const AllProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedCuisines, setSelectedCuisines] = useState<CuisineType[]>([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<ProductTypeCategory[]>([]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const cuisineParams = selectedCuisines.join(",");
    const typeParams = selectedProductTypes.join(",");

    const query = new URLSearchParams();
    if (cuisineParams) query.append("cuisines", cuisineParams);
    if (typeParams) query.append("types", typeParams);

    fetch(`http://localhost:3000/products?${query.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedCuisines, selectedProductTypes]);

  // Callback passed to ProductFilter
  const handleFilterChange = (
    newSelectedCuisines: CuisineType[],
    newSelectedProductTypes: ProductTypeCategory[]
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
