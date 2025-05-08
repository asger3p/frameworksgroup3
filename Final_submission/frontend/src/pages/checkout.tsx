import React, { useState, useEffect } from 'react';
import { useCart } from '../context/cartContext';      // Import to get cart items
import CheckoutForm from '../components/checkout/checkoutForm';     // Import checkout form
import '../styles.css';

const CheckoutPage: React.FC = () => {
    const { items } = useCart();

    // If cart is empty
    if (items.length === 0) {
        return (
            <div className='container mt-4'>
                <h2>Your cart is empty</h2>
            </div>
        );
    }

    // Calculate totals for summary
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const vat = subtotal * 0.25;
    const shipping = 39;
    const total = subtotal + vat + shipping;

    return (
        <div className='container mt-4'>
            <h2>Checkout</h2>
            <div className='row'>

                {/* Left Column: Cart + Form */}
                <div className='col-md-8'>
                    <div className='card mb-4'>
                        <div className='card-header'><h5>1. Your products</h5></div>
                        <div className='card-body'>
                            {items.map((item) => (
                                <div className='d-flex justify-content-between border-bottom py-2' key={item.productId}>
                                    <div>{item.name} x {item.quantity}</div>
                                    <div>{(item.price * item.quantity).toFixed(2)} kr </div>
                                    </div>
                            ))}
                        </div>
                    </div>
                    <CheckoutForm />
                </div>

                 {/* Right Column: Order Summary */}
                <div className='col-md-4'>
                    <div className='card-header'><h5>Order Summary</h5></div>
                        <div className='card-body'>
                            <p>Subtotal: {subtotal.toFixed(2)} kr</p>
                            <p>VAT (25%): {vat.toFixed(2)} kr</p>
                            <p>Shipping: {shipping.toFixed(2)} kr</p>
                            <hr />
                            <h5>Total: {total.toFixed(2)} kr</h5>
                        </div> 
                </div>
            </div>
        </div>
    );
};
 
export default CheckoutPage;