// ProductFilter.tsx
import React, { useEffect, useState } from "react";
import { CuisineType, ProductTypeCategory } from "../../types/product";

interface ProductFilterProps {
  selectedCuisines: CuisineType[];
  selectedProductTypes: ProductTypeCategory[];
  onFilterChange: (
    selectedCuisines: CuisineType[],
    selectedProductTypes: ProductTypeCategory[]
  ) => void;
}

function ProductFilter({
  selectedCuisines,
  selectedProductTypes,
  onFilterChange,
}: ProductFilterProps) {
  const [cuisines, setCuisines] = useState<CuisineType[]>([]);
  const [productTypes, setProductTypes] = useState<ProductTypeCategory[]>([]);

  // Fetch available categories on mount
  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => {
        setCuisines(data.categories.cuisines);
        setProductTypes(data.categories.types);
      })
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  // Handle checkbox toggling for cuisines
  const toggleCuisine = (cuisine: CuisineType) => {
    let newSelected: CuisineType[];
    if (selectedCuisines.includes(cuisine)) {
      newSelected = selectedCuisines.filter((c) => c !== cuisine);
    } else {
      newSelected = [...selectedCuisines, cuisine];
    }
    onFilterChange(newSelected, selectedProductTypes);
  };

  // Handle checkbox toggling for product types
  const toggleProductType = (type: ProductTypeCategory) => {
    let newSelected: ProductTypeCategory[];
    if (selectedProductTypes.includes(type)) {
      newSelected = selectedProductTypes.filter((t) => t !== type);
    } else {
      newSelected = [...selectedProductTypes, type];
    }
    onFilterChange(selectedCuisines, newSelected);
  };

  return (
    <div className="mb-4">
      <h5>Cuisines</h5>
      {cuisines.map((cuisine) => (
        <div key={cuisine} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id={`cuisine-${cuisine}`}
            checked={selectedCuisines.includes(cuisine)}
            onChange={() => toggleCuisine(cuisine)}
          />
          <label className="form-check-label" htmlFor={`cuisine-${cuisine}`}>
            {cuisine}
          </label>
        </div>
      ))}

      <h5 className="mt-4">Product Types</h5>
      {productTypes.map((type) => (
        <div key={type} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id={`type-${type}`}
            checked={selectedProductTypes.includes(type)}
            onChange={() => toggleProductType(type)}
          />
          <label className="form-check-label" htmlFor={`type-${type}`}>
            {type}
          </label>
        </div>
      ))}
    </div>
  );
}

export default ProductFilter;
