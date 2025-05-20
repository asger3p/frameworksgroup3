import React, { useState } from "react";
import BillingAddressForm from "./billingAddress";
import ShippingOptions from "./shippingOptions";
import PaymentOptions from "./paymentOptions";
import { OrderFormValues } from "../../types/order";

interface CheckoutFormProps {
    shippingOption: "standard" | "express";
    setShippingOption: React.Dispatch<React.SetStateAction<"standard" | "express">>;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ shippingOption, setShippingOption }) => {
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
        const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

    // Update formData whenever input field changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" && "checked" in e.target ? (e.target as HTMLInputElement).checked : value;

    if (name === "shippingOption") {
        setShippingOption(value as "standard" | "express");
    }

    setFormData((previousData) => ({ 
        ...previousData, 
        [name]: newValue,
        }));
    };

    // Validate form data, handle order submission and clear cart
    const handlePlacingOrder = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { [key: string]: boolean } = {};

        if (!formData.email) newErrors.email = true; 
        if (!formData.phone) newErrors.phone = true;
        if (!formData.firstName) newErrors.firstName = true;
        if (!formData.lastName) newErrors.lastName = true;
        if (!formData.address) newErrors.address = true;
        if (!formData.city) newErrors.city = true;
        if (!formData.zip) newErrors.zip = true;
        if (!formData.country) newErrors.country = true;

        if (!formData.email || !formData.firstName || !formData.address) {
            alert("Please fill out all required fields.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        setErrors({});
        console.log("Order placed:", formData);
        alert('Thank you for your order!');
        localStorage.removeItem('cart');
    };

    return (
        <form onSubmit={handlePlacingOrder} className="card mb-4 p-3">
            <div className="card mb-4">
            <div className="card-header">
            <h5>Personal Information</h5>
            </div>

            <div className="card-body">
            <input name="email" placeholder="Email *" value={formData.email} onChange={handleInputChange} className={`form-control mb-2 ${errors.email ? "is-invalid" : ""} `} />
            <input name="phone" placeholder="Phone *" value={formData.phone} onChange={handleInputChange} className={`form-control mb-2 ${errors.email ? "is-invalid" : ""} `} />
            <input name="firstName" placeholder="First Name *" value={formData.firstName} onChange={handleInputChange} className={`form-control mb-2 ${errors.email ? "is-invalid" : ""} `} />
            <input name="lastName" placeholder="Last Name *" value={formData.lastName} onChange={handleInputChange} className={`form-control mb-2 ${errors.email ? "is-invalid" : ""} `} />
            <input name="address" placeholder="Street Address *" value={formData.address} onChange={handleInputChange} className={`form-control mb-2 ${errors.email ? "is-invalid" : ""} `} />
            <input name="city" placeholder="City *" value={formData.city} onChange={handleInputChange} className={`form-control mb-2 ${errors.email ? "is-invalid" : ""} `} />
            <input name="zip" placeholder="ZIP Code *" value={formData.zip} onChange={handleInputChange} className={`form-control mb-2 ${errors.email ? "is-invalid" : ""} `} />
            <label htmlFor="country" className="form-label">Country *</label>
            <select
                id="country"
                name="country"
                value={formData.country} 
                onChange={handleInputChange} 
                className={`form-control mb-3 ${errors.email ? "is-invalid" : ""} `}
                >
                <option value="">Choose a Country</option>
                <option value="Denmark">Denmark</option>
                <option value="Sweden">Finland</option>
                <option value="Denmark">Germany</option>
                <option value="Sweden">Norway</option>
                <option value="Sweden">Sweden</option>
            </select>

        {/* Pass formData and handleInputChange to subcomponents */}
            <BillingAddressForm formData={formData} onChange={handleInputChange} />
            </div>
            </div>
            <ShippingOptions shippingOption={shippingOption} onChange={handleInputChange} />
            <PaymentOptions formData={formData} onChange={handleInputChange} />

            <button type="submit" className="btn btn-primary mt-3">Complete Order</button>
        </form>
    );
};    

export default CheckoutForm;