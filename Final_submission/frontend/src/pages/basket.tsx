// Description: Main cart page that composes TitleCart, maps CartItem list, and shows CartSummary.

import React from 'react';
import { useBasket } from '../context/basketContext'; // Pulls in cart context for all cart operations
import Greeting from '../components/greeting'; // Header section with greeting and subtitle
import BasketItem from '../components/basket/basketItem'; // Individual cart row component
import BasketSummary from '../components/basket/basketSummary'; // Summary section with total, clear, and navigation buttons

const BasketPage: React.FC = () => {
  const { items, updateQty, removeItem, clearBasket } = useBasket(); // Pull all items from cartContext

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0); // Compute total price from context items

  return (
    <>
      <Greeting />
      <div className="container mt-4">
      <h4 className="text-left">See your cart here</h4>
        <div id="cartItems">
          {items.length === 0 ? (
            <p>Your basket is empty.</p>
          ) : (
            items.map((item, idx) => (
              <BasketItem
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
      <BasketSummary total={total} onClear={clearBasket} />
    </>
  );
};

export default BasketPage;
