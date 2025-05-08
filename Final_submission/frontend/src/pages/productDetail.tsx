

//this page consists of a navbar, a 
//1. you need to fix the prop for the produc and connect to database

//state
//useEffect
//event handlers and custom functions


import { QuantitySelector } from "../components/QuantitySelector";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/product"; 


export function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [productId]);


        return ( 
          <div className="container mt-5">
            <div className="row">
              {/* Left Column */}
              <div className="col-6 text-center">
                <div className="image-container">
                    <img 
                    id="productImage" 
                    src={product?.image}
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
              </div>
            </div>
          </div>
        );
}
