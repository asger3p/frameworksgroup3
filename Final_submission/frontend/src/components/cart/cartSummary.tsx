// Description: Shows total price, clear-cart button, T&C checkbox, continue-shopping & checkout buttons.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // React Router hook for client-side navigation

interface CartSummaryProps { // props are inputs you pass into a component
  total: number; // computed sum of all item subtotals
  onClear: () => void; // callback to clear all items in the cart
}

const CartSummary: React.FC<CartSummaryProps> = ({ total, onClear }) => {
  const [agreed, setAgreed] = useState(false);   // tracks whether user has ticked the terms-and-conditions box
  const navigate = useNavigate();      // React Router navigate function

  const handleContinue = () => {
    navigate('/'); // navigate back to home page
  };

  const handleCheckout = () => { // SAME AS?= const handleCheckout = () => agreed && navigate('/checkout');
    if (agreed) navigate('/checkout');  // only proceed if user agreed to terms
  };

  return (
    <>
      <div className="container mt-4 text-end">
        <h5 id="totalPrice">Total Price: <span>{total}</span> kr</h5>
      </div>
      <div className="container mt-4 text-end">
        <button id="clearCart" className="btn btn-outline-danger" onClick={onClear}>
          Clear Cart
        </button>
      </div>
      <div className="container mt-4 text-end">
        <label>
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}  // toggle 'agreed'
          />{' '}
          I agree with the <a href="#">terms and conditions</a>
        </label>
      </div>
      <div className="container mt-4 text-end">
        <button id="continueshopping" className="btn btn-secondary me-2" onClick={handleContinue}>
          Continue Shopping
        </button>
        <button
          id="checkout"
          className="btn btn-primary"
          disabled={!agreed}                          // disable until agreed
          onClick={handleCheckout}
        >
          CHECKOUT
        </button>
      </div>
    </>
  );
};

export default CartSummary;