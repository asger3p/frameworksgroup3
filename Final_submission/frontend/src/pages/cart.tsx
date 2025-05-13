// Description: Main cart page that composes TitleCart, maps CartItem list, and shows CartSummary.
import React, { useState, useEffect } from 'react';
import Greeting from '../components/greeting'; // Header section with greeting and subtitle
import CartItem from '../components/cart/cartItem'; // Individual cart row component
import CartSummary from '../components/cart/cartSummary'; // Summary section with total, clear, and navigation buttons
import { CartItem as CartItemType } from '../types/cart'; // Type definition for cart items

const CartPage: React.FC = () => { // Functional component for the entire cart page
  const [cart, setCart] = useState<CartItemType[]>([]); // Local state: list of items currently in the cart

  useEffect(() => { // On mount: load cart array from localStorage
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => { // On cart change: save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleIncrease = (index: number) => { // Handler: increase quantity of a specific item by index
    setCart(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (index: number) => { // Handler: decrease (or remove if quantity becomes 0) specific item
    setCart(prev =>
      prev
        .map((item, i) =>
          i === index ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const handleRemove = (index: number) => { // Handler: remove an item entirely
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleClear = () => setCart([]); // Handler: clear the entire cart

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0); // Compute total price across all items

  return (
    <>
      <Greeting />
      <div className="container mt-4">
      <h4 className="text-left">See your cart here</h4>
        <h5>Overview of Items:</h5>
        <div id="cartItems"> {/* Container for all CartItem rows */}
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item, idx) => (
              <CartItem
                key={item.productId}    // Unique key for React list diffing
                item={item}
                index={idx}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
            ))
          )}
        </div>
      </div>
      <CartSummary total={total} onClear={handleClear} />
    </>
  );
};

export default CartPage;
