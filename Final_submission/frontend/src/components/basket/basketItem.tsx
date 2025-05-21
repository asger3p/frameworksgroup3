// Description: Renders one item row in the cart, with imageUrl, name, quantity controls, price, and remove button.

import React from 'react';
import { BasketItem as BasketItemType } from '../../types/basket'; // Type for individual cart item data

interface BasketItemProps { 
  item: BasketItemType; // The cart item object with properties 
  index: number; // Index of this item in the cart array, used in callbacks
  onIncrease: (index: number) => void; // Callback to increase quantity by one
  onDecrease: (index: number) => void; // Callback to decrease quantity by one (or remove if zero)
  onRemove: (index: number) => void; // Callback to remove this item from the cart entirely
}

const BasketItem: React.FC<BasketItemProps> = ({ item, index, onIncrease, onDecrease, onRemove }) => ( // add some pseudocode here
  <div className="row align-items-center border-bottom py-2">
    <div className="col-2">
      <img
        src={item.imageUrl ? `http://localhost:3000${item.imageUrl}` : ''} // fallback if no image URL provided
        alt={item.name}
        className="img-fluid"
        style={{ maxWidth: 50 }}
      />
    </div>
    <div className="col-4">
      {/* Product name in bold, with size as muted text */}
      <div>
        <strong>{item.name}</strong>
      <small className="text-muted ms-2">{item.size}</small>
      </div>
    </div>
    <div className="col-3 d-flex align-items-center">
      <button className="decrease btn btn-sm btn-outline-secondary px-2 py-1"
              onClick={() => onDecrease(index)}>–</button>
      <input
        type="number"
        className="quantity-input mx-1 text-center w-25 fs-6"
        value={item.quantity}
        readOnly // quantity is controlled via buttons
      />
      <button className="increase btn btn-sm btn-outline-secondary px-2 py-1"
              onClick={() => onIncrease(index)}>+</button>
    </div>
    <div className="col-2 price" data-price={item.price}>
      {item.price * item.quantity} kr {/* computed subtotal for this item */}
    </div>
    <div className="col-1">
      <button className="btn btn-sm btn-outline-danger remove"
              onClick={() => onRemove(index)}>×</button>
    </div>
  </div>
);

export default BasketItem;
