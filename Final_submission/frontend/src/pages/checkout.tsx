import React, { useState } from 'react';
import { useBasket } from '../context/basketContext';
import CheckoutForm from '../components/checkout/checkoutForm';
import BasketItem from '../components/basket/basketItem';
import '../styles.css';

const CheckoutPage: React.FC = () => {
  const { items, updateQty, removeItem } = useBasket(); // Get basket items and actions from context
  const [shippingOption, setShippingOption] = useState<'standard' | 'express'>('standard'); // Track selected shipping option

  // If basket is empty, show message
  if (items.length === 0) {
    return (
      <div className='container mt-4'>
        <h4>Oops... Looks like you don't have anything in your cart yet</h4>
      </div>
    );
  }

  // Calculate total price
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vat = subtotal * 0.25;
  const shipping = shippingOption === 'express' ? 89 : 39;
  const total = subtotal + vat + shipping;

  return (
    <div className='container mt-4'>
      <h2>Checkout</h2>
      <div className='row'>
        
        {/* Left side: Basket items and form */}
        <div className='col-md-8'>
          <div className='card mb-4'>
            <div className='card-header'><h5>Your Products</h5></div>
            <div className='card-body'>
              {items.map((item, idx) => (
                <BasketItem
                  key={`${item.productId}-${item.size}`} // Unique key per product+size
                  index={idx}
                  item={item}
                  onIncrease={() => updateQty(idx, item.quantity + 1)} // Increase item quantity
                  onDecrease={() =>
                    item.quantity > 1 ? updateQty(idx, item.quantity - 1) : removeItem(idx) // Decrease or remove if 1
                  }
                  onRemove={() => removeItem(idx)} // Remove item from basket
                />
              ))}
            </div>
          </div>

          <CheckoutForm
            shippingOption={shippingOption}
            setShippingOption={setShippingOption}
          />
        </div>

        {/* Right side: Order summary */}
        <div className='col-md-4'>
          <div className='card'>
            <div className='card-header'><h5>Order Summary</h5></div>
            <div className='card-body'>
              <p><strong>Subtotal:</strong> {subtotal.toFixed(2)} kr</p>
              <p><strong>VAT (25%):</strong> {vat.toFixed(2)} kr</p>
              <p><strong>Shipping:</strong> {shipping.toFixed(2)} kr</p>
              <hr />
              <h6><strong>Total:</strong> {total.toFixed(2)} kr</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
