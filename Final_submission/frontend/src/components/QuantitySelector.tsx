import React, { useState, useEffect } from 'react';
import { Size } from "../types/product";

type QuantitySelectorProps = {
  sizes: Size[];
  onSelectSize?: (size: Size) => void;
  onSelectQuantity?: (qty: number) => void;
};

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  sizes,
  onSelectSize,
  onSelectQuantity,
}) => {
  const [selectedSize, setSelectedSize] = useState<Size | null>(sizes.length > 0 ? sizes[0] : null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (selectedSize) {
      onSelectSize?.(selectedSize);
    }
  }, [selectedSize]);

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
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  }

  return (
    <div className="quantity-selector mt-4">
      <label className="form-label"><strong>Size</strong></label>
      <select className="form-select" onChange={handleSizeChange} value={selectedSize?.size || ''}>
        {sizes.map((size) => (
          <option key={size.size} value={size.size}>
            {size.size} — {size.price} kr
          </option>
        ))}
      </select>

      <div id="quantitySelector" className="d-flex align-items-center gap-2 mt-2">
        <button className="btn btn-sm btn-outline-secondary px-2 py-1" onClick={decreaseQuantity}>-</button>
        <input id="quantity" className="mx-1 fs-6 text-center w-25" type="number" value={quantity} min="1" readOnly />
        <button id="increase" className="btn btn-sm btn-outline-secondary px-2 py-1" onClick={increaseQuantity}>+</button>
      </div>

      <div id="price-container" className="price-box">
        <strong>Total: </strong> 
        <span className='ms-2'>{totalPrice} kr</span>
      </div>
    </div>
  );
};

export default QuantitySelector;
