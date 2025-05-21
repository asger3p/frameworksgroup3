

//this page consists of a navbar, a 
//1. you need to fix the prop for the produc and connect to database

//state
//useEffect
//event handlers and custom functions


import { QuantitySelector } from "../components/QuantitySelector";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product, Size } from "../types/product"; 
import AddToBasketButton from "../components/addToBasketButton";



export function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

const [selectedSize, setSelectedSize] = useState<Size | null>(null);
const [quantity,     setQuantity]     = useState<number>(1);
const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        // If this product has a sizes array, pick the first entry as the initial “selectedSize” so the QuantitySelector is pre-populated.
        if (data.sizes && data.sizes.length){
          setSelectedSize(data.sizes[0]); 
        }
      });
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
                <p>{product?.description}</p>



                {/* supply available sizes and callbacks to update selectedSize & quantity */}
                {/* onSelectSize: callback so that when the selector chooses a new size, we update our `selectedSize` state here*/}
                {/* onSelectQuantity: callback so that when the selector changes the number of units, we update our `quantity` state here*/}
                <QuantitySelector  
                  sizes={product.sizes}
                  onSelectSize={(s: Size) => setSelectedSize(s)} 
                  onSelectQuantity={(q: number) => setQuantity(q)} 
                />
                {/* pass product, chosen size, and quantity for adding to cart */}
               <div className="d-flex mt-3 align-items-center gap-3">
            {/* Add to Cart button */}
            <div style={{ position: 'relative' }}>
            <AddToBasketButton
              product={product}
              selectedSize={selectedSize!}
              quantity={quantity}
            />
            </div>
            {/* Back button */}
            <button
              className="btn-primary back-button ms-2" style={{ height: "40px" }}
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
              </div>
            </div>
          </div>
        );
}
