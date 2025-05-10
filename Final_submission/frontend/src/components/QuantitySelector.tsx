
//this component let the user choose an amount
//1. fix price update and rerender
//2. add button from Ida.

import React, { useState, useEffect } from 'react';
import { Size } from "../types/product"; // assuming Size is defined like: { size: string; price: number }

type QuantitySelectorProps = {
    sizes: Size[];
  };


export function QuantitySelector({sizes}: QuantitySelectorProps) {

    const [selectedSize, setSelectedSize] = useState<Size | null>(sizes[0] || null);
    const [quantity, setQuantity] = useState<number>(1); //the initial value is 1

    const totalPrice = selectedSize ? selectedSize.price * quantity : 0;
    
    const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const size = sizes.find(s => s.size === e.target.value);
        if (size) setSelectedSize(size);
      };

    function increaseQuantity() {
        setQuantity((prevQuantity) => prevQuantity + 1); //You’re not defining prevQuantity — React injects it for you.
    }

    function decreaseQuantity() {
        setQuantity((prevQuantity) => prevQuantity > 1 ? prevQuantity - 1 : prevQuantity); //checks if quantity > 1
    }


    return (
        <>
          {/*Dropdown Box */}
          <div className="quantity-selector mt-4">
            {/* Size dropdown */}
            <label className="form-label">Size</label>
            <select className="form-select" onChange={handleSizeChange} value={selectedSize?.size}>
              {sizes.map((size) => (
                <option key={size.size} value={size.size}>
                  {size.size} — {size.price} kr
                </option>
              ))}
            </select>
      
            {/*Quantity Selector*/}
            <div id="quantitySelector" className="d-flex align-items-center gap-2">
              <button className="btn btn-sm btn-outline-secondary px-3 py-2" onClick={decreaseQuantity}>-</button>
              <input id="quantity" className="mx-1 fs-5 text-center w-25" type="number" value={quantity} min="1" readOnly />
              <button id="increase" className="btn btn-sm btn-outline-secondary px-3 py-2" onClick={increaseQuantity}>+</button>
            </div>
      
            {/*Price*/}
            <div id="price-container" className="price-box">
              <strong>Total:</strong> {totalPrice} kr
            </div>
      
          </div>
        </>
      );
}