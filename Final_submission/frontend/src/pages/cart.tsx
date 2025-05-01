import React from 'react';
import { useCart } from '../context/cartContext';

const CartPage: React.FC = () => {
  // Pull cart state and actions from context
  const { items, removeItem, updateQty, clearCart } = useCart();

  // If cart is empty, show a friendly message
  if (items.length === 0) {
    return (
      <div className="container mt-4"> {/* Bootstrap container + margin-top */}
        <h2>Your Cart is Empty</h2>
      </div>
    );
  }

  return (
    <div className="container mt-4"> {/* Main wrapper with spacing */}
      <h2>Overview of Items:</h2>

      {items.map(item => (
        <div
          key={item.productId}
          className="row align-items-center border-bottom py-2" 
          /* 
            row: Bootstrap flex row 
            align-items-center: vertically center 
            border-bottom: separator line 
            py-2: vertical padding 
          */
        >
          {/* Product image */}
          <div className="col-2">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="img-fluid" 
              style={{ maxWidth: '50px' }} // limit size
            />
          </div>

          {/* Product name */}
          <div className="col-4">
            {item.name}
          </div>

          {/* Quantity controls */}
          <div className="col-3 d-flex align-items-center">
            <button
              className="decrease btn btn-sm btn-outline-secondary px-2 py-1"
              onClick={() =>
                updateQty(item.productId, Math.max(1, item.quantity - 1))
              }
            >
              – {/* decrease quantity */}
            </button>
            <input
              type="text"
              readOnly
              value={item.quantity}
              className="quantity-input mx-1 text-center w-25 fs-6"
              /* 
                mx-1: horizontal margin 
                text-center: center text 
                w-25: width 25% 
                fs-6: font-size level 6
              */
            />
            <button
              className="increase btn btn-sm btn-outline-secondary px-2 py-1"
              onClick={() =>
                updateQty(item.productId, item.quantity + 1)
              }
            >
              + {/* increase quantity */}
            </button>
          </div>

          {/* Line total */}
          <div
            className="col-2 price"
            data-price={item.price} // storing unit price in case you need it
          >
            {(item.price * item.quantity).toFixed(2)} kr
          </div>

          {/* Remove item */}
          <div className="col-1">
            <button
              className="btn-sm btn-outline-danger remove"
              onClick={() => removeItem(item.productId)} // remove from cart
            >
              ×
            </button>
          </div>
        </div>
      ))}

      {/* Total Price row */}
      <div className="row mt-4">
        <div className="col text-end"> {/* right-align text */}
          <h5>
            Total Price:{' '}
            <span>
              {items
                .reduce((sum, i) => sum + i.price * i.quantity, 0)
                .toFixed(2)}{' '}
              kr
            </span>
          </h5>
        </div>
      </div>

      {/* Action buttons: Clear, Continue, Checkout */}
      <div className="row mt-3">
        <div className="col text-end">
          <button
            id="clearCart"
            className="btn btn-outline-danger me-2" 
            // me-2 adds right margin between buttons
            onClick={clearCart} 
          >
            Clear Cart
          </button>

          <button
            id="continueShopping"
            className="btn btn-primary me-2"
            onClick={() => window.location.assign('/')}
            /* Navigate back to home */
          >
            Continue Shopping
          </button>

          <button  
            id="checkout"
            className="btn btn-success"
            onClick={() => window.location.assign('/checkout')}
            /* Navigate to checkout page */
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
