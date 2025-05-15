import React, { useState, useEffect } from 'react';
import { Size } from "../types/product"; // assuming Size is defined like: { size: string; price: number }

type QuantitySelectorProps = {
    sizes: Size[];

    // Callback props that let the parent know when the user picks a new size or qty.
    onSelectSize?:      (size: Size)   => void; 
    onSelectQuantity?:  (qty: number)  => void;
};

export function QuantitySelector({
  sizes,
  onSelectSize,
  onSelectQuantity,
}: QuantitySelectorProps) {

    const [selectedSize, setSelectedSize] = useState<Size | null>(sizes.length > 0 ? sizes[0] : null); // Fixed initialization
    const [quantity, setQuantity] = useState<number>(1); // Initial value is 1

    // Notify parent whenever selectedSize changes (after render)
    useEffect(() => {
      if (selectedSize) {
        onSelectSize?.(selectedSize);
      }
    }, [selectedSize]);

    // Similarly, let the parent know whenever the quantity changes.
    useEffect(() => {
      onSelectQuantity?.(quantity);
    }, [quantity]);

    const totalPrice = selectedSize ? selectedSize.price * quantity : 0;
    
    const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const size = sizes.find(s => s.size === e.target.value);
        if (size) {
          setSelectedSize(size);
        }
    };

    function increaseQuantity() {
        setQuantity(prev => prev + 1);
    }

    function decreaseQuantity() {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1)); // Ensures quantity doesn't go below 1
    }

    return (
        <>
          {/*Dropdown Box */}
          <div className="quantity-selector mt-4">
            {/* Size dropdown */}
            <label className="form-label">Size</label>
            <select className="form-select" onChange={handleSizeChange} value={selectedSize?.size || ''}>
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
