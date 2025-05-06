import React from "react";
import { Product } from "../../types/product";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

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
