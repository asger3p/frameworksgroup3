import React from "react";
import { Product } from "../../types/product";
import { Link } from "react-router-dom";

// Define the props for the ProductCard component
interface ProductCardProps {
  product: Product;
}

// ProductCard component displays a single product in a Bootstrap card format
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      to={`/products/${product.product_id}`}
      className="card"
      style={{
        width: "18rem",
        marginRight: "15px",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <img
        src={`http://localhost:3000${product.image}`}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body">
        <h5>{product.name}</h5>
        <p>{product.subheading}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
