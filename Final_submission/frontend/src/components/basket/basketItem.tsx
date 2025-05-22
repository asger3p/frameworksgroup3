import React from "react";
import { BasketItem as BasketItemType } from "../../types/basket";

interface BasketItemProps {
  item: BasketItemType;        // The cart item data
  index: number;               // Index in the cart array
  onIncrease: (index: number) => void;  // Increase quantity callback
  onDecrease: (index: number) => void;  // Decrease quantity callback
  onRemove: (index: number) => void;    // Remove item callback
}

const BasketItem: React.FC<BasketItemProps> = ({
  item,
  index,
  onIncrease,
  onDecrease,
  onRemove,
}) => (
  <div className="row align-items-center border-bottom py-2">
    <div className="col-2">
      <img
        src={item.imageUrl ? `http://localhost:3000${item.imageUrl}` : ""}
        alt={item.name}
        className="img-fluid"
        style={{ maxWidth: 50 }}
      />
    </div>
    <div className="col-4">
      <div>
        <strong>{item.name}</strong>
        <small className="text-muted ms-2">{item.size}</small>
      </div>
    </div>
    <div className="col-3 d-flex align-items-center">
      <button
        className="decrease btn btn-sm btn-outline-secondary px-2 py-1"
        onClick={() => onDecrease(index)}
      >
        –
      </button>
      <input
        type="number"
        className="quantity-input mx-1 text-center w-25 fs-6"
        value={item.quantity}
        readOnly
      />
      <button
        className="increase btn btn-sm btn-outline-secondary px-2 py-1"
        onClick={() => onIncrease(index)}
      >
        +
      </button>
    </div>
    <div className="col-2 price" data-price={item.price}>
      {item.price * item.quantity} kr
    </div>
    <div className="col-1">
      <button
        className="btn btn-sm btn-outline-danger remove"
        onClick={() => onRemove(index)}
      >
        ×
      </button>
    </div>
  </div>
);

export default BasketItem;
