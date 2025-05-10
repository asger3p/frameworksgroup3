

//this page consists of a navbar, a 
//1. you need to fix the prop for the produc and connect to database

//state
//useEffect
//event handlers and custom functions


import { QuantitySelector } from "../components/QuantitySelector";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/product"; 
import AddToCartButton from "../components/addToCartButton";

export function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${productId}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [productId]);

  // don’t render until product is loaded
  if (!product) {
    return <div>Loading…</div>;
  }

        return ( 
          <div className="container mt-5">
            <div className="row">
              {/* Left Column */}
              <div className="col-6 text-center">
                <div className="image-container">
                    <img 
                    id="productImage" 
                    src={`http://localhost:3000${product?.image}`}
                    className="img-fluid" 
                    style={{ maxWidth: "80%", height: "auto" }}
                    />
            </div>
              </div>
      
              {/* Right Column */}
              <div className="col-6">
              <h2 className="text-left">{product?.name}</h2>
                <h5 className="text-muted">{product?.subheading}</h5>
                <p> {product?.description}</p>
                <QuantitySelector sizes={product?.sizes || []}/>
                <AddToCartButton product={product} selectedSize={product.sizes[0]} />
              </div>
            </div>
          </div>
        );
}
