import React from "react";
import ProductCard from "../productcard/ProductCard";
import { Product } from "../../types/product";

// Define the props for the ProductGrid component
interface ProductGridProps {
  products: Product[];
}

// ProductGrid component to display a grid of product cards
const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="row g-3">
      {products.map((product) => (
        <div className="col-md-4" key={product.product_id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;