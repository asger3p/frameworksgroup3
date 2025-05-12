// pages/cart.tsx
import React from 'react';
import { useCart } from '../context/cartContext';
import TitleCart from '../components/cart/titleCart';
import CartItem from '../components/cart/cartItem';
import CartSummary from '../components/cart/cartSummary';

const CartPage: React.FC = () => {
  const { items, updateQty, removeItem, clearCart } = useCart(); // Pull all items from cartContext

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0); // Compute total price from context items

  return (
    <>
      <TitleCart />

      <div className="container mt-4">
        <h5>Overview of Items:</h5>
        <div id="cartItems">
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            items.map((item, idx) => (
              <CartItem
                key={`${item.productId}-${item.size}`} // Unique React key (per size and product): lets React track this item across renders
                index={idx}   // position in the list (used internally by CartItem)
                item={item}  // the CartItem object (id, name, price, qty, etc. from prop)
                onIncrease={() => updateQty(idx, item.quantity + 1)} // bump this item’s quantity by 1
                onDecrease={() =>
                  item.quantity > 1
                    ? updateQty(idx, item.quantity - 1)
                    : removeItem(idx) // decrement qty or remove if it hits zero
                }
                onRemove={() => removeItem(idx)} // remove this item entirely
              />
            ))
          )}
        </div>
      </div>

      {/* Pass the computed total and clearCart action into the summary */}
      <CartSummary total={total} onClear={clearCart} />
    </>
  );
};

export default CartPage;
