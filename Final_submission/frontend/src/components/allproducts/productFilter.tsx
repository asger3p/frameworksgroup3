import React from "react";
import { CuisineType, ProductTypeCategory } from "../../types/product";

// Define the props for the ProductFilter component
interface ProductFilterProps {
  selectedCuisines: CuisineType[];
  selectedProductTypes: ProductTypeCategory[];
  onCuisineChange: (cuisine: CuisineType) => void;
  onProductTypeChange: (type: ProductTypeCategory) => void;
}

// Define the available cuisines and product types
const cuisines: CuisineType[] = ["Indian", "Mediterranean", "Latin American", "Asian"];
const productTypes: ProductTypeCategory[] = ["Whole", "Ground", "Blend"];

// ProductFilter component allowing users to filter products based on cuisine and product type
const ProductFilter: React.FC<ProductFilterProps> = ({
  selectedCuisines,
  selectedProductTypes,
  onCuisineChange,
  onProductTypeChange
}) => {
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
            onChange={() => onCuisineChange(cuisine)}
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
            onChange={() => onProductTypeChange(type)}
          />
          <label className="form-check-label" htmlFor={`type-${type}`}>
            {type}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ProductFilter;
