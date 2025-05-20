import React, { useState, useEffect } from 'react';
import { useCart } from '../context/cartContext';      // Import to get cart items
import CheckoutForm from '../components/checkout/checkoutForm';     // Import checkout form
import CartItem from '../components/cart/cartItem';
import { CartItem as CartItemType } from '../types/cart';
import '../styles.css';

const CheckoutPage: React.FC = () => {
    const { items, updateQty, removeItem } = useCart();
    const [shippingOption, setShippingOption] = useState<"standard" | "express">("standard");

    // If cart is empty
    if (items.length === 0) {
        return (
            <div className='container mt-4'>
                <h3>Oops... Looks like you don't have anything in your cart yet</h3>
            </div>
        );
    }

    // Calculate totals for summary
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const vat = subtotal * 0.25;
    const shipping = shippingOption === "express" ? 89 : 39;
    const total = subtotal + vat + shipping;

    return (
        <div className='container mt-4'>
            <h2>Checkout</h2>
            <div className='row'>

                {/* Left Column: Cart + Form */}
                <div className='col-md-8'>
                    <div className='card mb-4'>
                        <div className='card-header'><h5>Your Products</h5></div>
                        <div className='card-body'>
                            {/* Retrieve items in the cart and increase/decrease/remove buttons with CartItem component */}
                            {items.map((item, idx) => (
                                <CartItem
                                key={`${item.productId}-${item.size}`}
                                index={idx}
                                item={item}
                                onIncrease={() => updateQty(idx, item.quantity + 1)}
                                onDecrease={() =>
                                    item.quantity > 1 ? updateQty(idx, item.quantity - 1) : removeItem(idx)
                                }
                                onRemove={() => removeItem(idx)}
                                />
                            ))}
                        </div>
                    </div>
                {/* Retrieve checkout form */}
                    <CheckoutForm 
                        shippingOption={shippingOption} setShippingOption={setShippingOption}
                    />
                </div>

                 {/* Right Column: Order Summary */}
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