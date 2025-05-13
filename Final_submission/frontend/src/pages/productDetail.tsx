

//this page consists of a navbar, a 
//1. you need to fix the prop for the produc and connect to database

//state
//useEffect
//event handlers and custom functions


import { QuantitySelector } from "../components/QuantitySelector";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product, Size } from "../types/product"; 
import AddToCartButton from "../components/addToCartButton";



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

const parseDescription = (description: string) => {
  const result: React.ReactNode[] = []; // Array to hold the parsed parts

  let currentText = ''; // Temporary variable to hold text as we loop
  let insideStrong = false; // Flag to track if we're inside a <strong> tag

  // Loop through each character in the string
  for (let i = 0; i < description.length; i++) {
    const char = description[i];

    // Check if we encounter a <br> tag
    if (char === '<' && description.substring(i, i + 4) === '<br>') {
      // If we encounter <br>, we push the current text and add the line break
      if (currentText.trim() !== '') {
        result.push(currentText);
      }
      result.push(<br key={i} />);
      currentText = ''; // Reset the currentText
      i += 3; // Skip <br>
    } 
    // Check if we encounter a <strong> tag
    else if (char === '<' && description.substring(i, i + 8) === '<strong>') {
      // If we encounter <strong>, we handle starting the strong tag
      if (currentText.trim() !== '') {
        result.push(currentText);
      }
      insideStrong = true;
      currentText = ''; // Reset the currentText for the strong content
      i += 7; // Skip the <strong> tag
    } 
    // Check if we encounter a </strong> tag
    else if (char === '<' && description.substring(i, i + 9) === '</strong>') {
      // If we encounter </strong>, we handle ending the strong tag
      result.push(<strong key={i}>{currentText}</strong>);
      currentText = ''; // Reset the currentText after the strong tag
      insideStrong = false;
      i += 8; // Skip the </strong> tag
    } 
    else {
      currentText += char;
    }
  }

  // Push any remaining text after the loop ends
  if (currentText.trim() !== '') {
    if (insideStrong) {
      result.push(<strong key={description.length}>{currentText}</strong>);
    } else {
      result.push(currentText);
    }
  }

  return result;
};


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
                <div>{parseDescription(product?.description || '')}</div>

                {/* supply available sizes and callbacks to update selectedSize & quantity */}
                {/* onSelectSize: callback so that when the selector chooses a new size, we update our `selectedSize` state here*/}
                {/* onSelectQuantity: callback so that when the selector changes the number of units, we update our `quantity` state here*/}
                <QuantitySelector  
                  sizes={product.sizes}
                  onSelectSize={(s: Size) => setSelectedSize(s)} 
                  onSelectQuantity={(q: number) => setQuantity(q)} 
                />
                {/* pass product, chosen size, and quantity for adding to cart */}
               <div className="d-flex mt-3">
            {/* Add to Cart button */}
            <AddToCartButton
              product={product}
              selectedSize={selectedSize!}
              quantity={quantity}
            />
            {/* Back button */}
            <button
              className="btn-primary ml-2 ms-2"
              onClick={() => navigate('/')}
            >
              Back
            </button>
          </div>
              </div>
            </div>
          </div>
        );
}
