import React from "react";
import { Product } from "../../types/product";
import { Link } from "react-router-dom";
import AddToBasketButton from "../addToBasketButton";

// Define the props for the ProductCard component
interface ProductCardProps {
  product: Product;
}

// ProductCard component displays a single product in a Bootstrap card format
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div
      className="card d-flex-column"
      style={{
        width: "18rem",
        marginRight: "15px"
      }}
    >
      {/* Clicking anywhere here (image + text) will go to the detail page */}
      <Link to={`/products/${product.product_id}`}
            style={{ textDecoration: "none", color: "inherit"}}>
        <img
          src={`http://localhost:3000${product.image}`}
          className="card-img-top"
          alt={product.name}
        />
        <div className="card-body flex-grow-1">
          <h5>{product.name}</h5>
          <p>{product.subheading}</p>
        </div>
    </Link>

    {/* Card footer holds our AddToBasketButton */}
      <div className="card-footer bg-transparent border-top-0 mt-auto">
        {/* defaults to 1×100 g behind the scenes */}
        <AddToBasketButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
