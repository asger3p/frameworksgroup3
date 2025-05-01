import React, { useState } from "react";
import BillingAddressForm from "./billingAddress";
import ShippingOptions from "./shippingOptions";
import PaymentOptions from "./paymentOptions";
import { OrderFormValues } from "../../types/order";

const CheckoutForm: React.FC = () => {
        const [formData, setFormData] = useState<OrderFormValues>({     // Creates formData
            email: "",
            phone: "",
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            zip: "",
            country: "",
            billingDifferent: false,
            billingFirstName: "",
            billingLastName: "",
            billingAddress: "",
            billingCity: "",
            billingZip: "",
            billingCountry: "",
            shippingOption: "standard",
            paymentMethod: "creditCard",
            cardName: "",
            cardNumber: "",
            expDate: "",
            cvv: "",
        });

    // Update formData whenever input field changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" && "checked" in e.target ? (e.target as HTMLInputElement).checked : value;
    setFormData((previousData) => ({ 
        ...previousData, 
        [name]: newValue,
        }));
    };

    // Validate form data, handle order submission and clear cart
    const handlePlacingOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email || !formData.firstName || !formData.address) {
            alert("Please fill out all required fields.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            alert("Please enter a valid email address.");
            return;
        }
        console.log("Order placed:", formData);
        alert('Thank you for your order!');
        localStorage.removeItem('cart');
    };

    return (
        <form onSubmit={handlePlacingOrder} className="card mb-4 p-3">
            <h5>2. Personal Information</h5>

            <input name="email" placeholder="Email *" value={formData.email} onChange={handleInputChange} className="form-control mb-2" />
            <input name="phone" placeholder="Phone *" value={formData.phone} onChange={handleInputChange} className="form-control mb-2" />
            <input name="firstName" placeholder="First Name *" value={formData.firstName} onChange={handleInputChange} className="form-control mb-2" />
            <input name="lastName" placeholder="Last Name *" value={formData.lastName} onChange={handleInputChange} className="form-control mb-2" />
            <input name="address" placeholder="Street Address *" value={formData.address} onChange={handleInputChange} className="form-control mb-2" />
            <input name="city" placeholder="City *" value={formData.city} onChange={handleInputChange} className="form-control mb-2" />
            <input name="zip" placeholder="ZIP Code *" value={formData.zip} onChange={handleInputChange} className="form-control mb-2" />
            <label htmlFor="country">Choose a Country *</label>
            <select
                id="country"
                name="country"
                value={formData.country} 
                onChange={handleInputChange} 
                className="form-control mb-3" 
                >
                <option value="">Choose a Country *</option>
                <option value="Denmark">Denmark</option>
                <option value="Sweden">Sweden</option>
            </select>

        {/* Pass formData and handleInputChange to subcomponents */}
            <BillingAddressForm formData={formData} onChange={handleInputChange} />
            <ShippingOptions formData={formData} onChange={handleInputChange} />
            <PaymentOptions formData={formData} onChange={handleInputChange} />

            <button type="submit" className="btn btn-success mt-3">Complete Order</button>
        </form>
    );
};    

export default CheckoutForm;