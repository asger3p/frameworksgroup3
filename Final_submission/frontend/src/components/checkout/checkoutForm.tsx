import React, { useState } from 'react';
import BillingAddressForm from './billingAddress';
import ShippingOptions from './shippingOptions';
import PaymentOptions from './paymentOptions';

// Define values for shipping options
type ShippingOption = 'standard' | 'express';

// Props expected
interface CheckoutFormProps {
  shippingOption: ShippingOption; // current selected shipping option
  setShippingOption: (option: ShippingOption) => void;  // setter for updating shipping option
}

// Main component definition
const CheckoutForm: React.FC<CheckoutFormProps> = ({
  shippingOption,
  setShippingOption,
}) => {
  // State to hold form input values
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    billingDifferent: false, // check whether billing address is different from shipping
    billingFirstName: '',
    billingLastName: '',
    billingAddress: '',
    billingCity: '',
    billingZip: '',
    billingCountry: '',
    paymentMethod: 'creditCard', // default payment method
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  // State to hold validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;

    // Update formData with new value or checkbox state
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle input blur (used for validation on leaving a field)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let error = '';

    // Validate input data
    switch (name) {
      case 'email':
        if (!value) error = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email address.';
        break;
      case 'phone':
        if (!value) error = 'Phone number is required.';
        else if (!/^\+?\d{1,12}$/.test(value)) error = 'Invalid phone number.';
        break;
        // Required text fields
      case 'firstName':
      case 'lastName':
      case 'address':
      case 'city':
      case 'zip':
      case 'country':
        if (!value) error = `${name} is required.`;
        break;
        // Conditionally required fields
      case 'billingFirstName':
      case 'billingLastName':
      case 'billingAddress':
      case 'billingCity':
      case 'billingZip':
      case 'billingCountry':
        if (formData.billingDifferent && !value) error = `${name} is required.`;
        break;
        // Required if payment method = credit card
      case 'cardName':
      case 'cardNumber':
      case 'expDate':
      case 'cvv':
        if (formData.paymentMethod === 'creditCard' && !value) error = `${name} is required.`;
        break;
    }

    // Set error message
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // Handle form submission (= placing order)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
    const newErrors: { [key: string]: string } = {};

  const requiredFields = [
    'email',
    'phone',
    'firstName',
    'lastName',
    'address',
    'city',
    'zip',
    'country',
  ];

  // Validate all required fields are filled
  requiredFields.forEach((field) => {
    if (!formData[field as keyof typeof formData]) {
      newErrors[field] = `${field} is required.`;
    }
  });

  // Same for billing fields (if billingDifferent is checked)
  if (formData.billingDifferent) {
    const billingFields = [
      'billingFirstName',
      'billingLastName',
      'billingAddress',
      'billingCity',
      'billingZip',
      'billingCountry',
    ];
    billingFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `${field} is required.`;
      }
    });
  }

  // Credit card fields (only if payment method is creditCard)
  if (formData.paymentMethod === 'creditCard') {
    const cardFields = ['cardName', 'cardNumber', 'expDate', 'cvv'];
    cardFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `${field} is required.`;
      }
    });
  }

  // Email and phone format validation
  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = 'Invalid email address.';
  }

  if (formData.phone && !/^\+?\d{1,12}$/.test(formData.phone)) {
    newErrors.phone = 'Invalid phone number.';
  }

  setErrors(newErrors);

  // Alert the user in case of errors
  if (Object.keys(newErrors).length > 0) {
    alert('Please fill in all required fields correctly before completing your order.');
    return;
  }

  // If no errors, submit form
  console.log('Form submitted:', formData);
  alert('Thank for your order!');
};

  return (
    <form onSubmit={handleSubmit}>
      {/* Personal Information Card */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>Personal Information</h5>
        </div>
        <div className="card-body">
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email *</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone *</label>
            <input
              type="text"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>

          {/* First Name */}
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name *</label>
            <input
              type="text"
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name *</label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
          </div>

          {/* Address */}
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address *</label>
            <input
              type="text"
              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>

          {/* City */}
          <div className="mb-3">
            <label htmlFor="city" className="form-label">City *</label>
            <input
              type="text"
              className={`form-control ${errors.city ? 'is-invalid' : ''}`}
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.city && <div className="invalid-feedback">{errors.city}</div>}
          </div>

          {/* ZIP */}
          <div className="mb-3">
            <label htmlFor="zip" className="form-label">ZIP Code *</label>
            <input
              type="text"
              className={`form-control ${errors.zip ? 'is-invalid' : ''}`}
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.zip && <div className="invalid-feedback">{errors.zip}</div>}
          </div>

          {/* Country */}
          <div className="mb-3">
            <label htmlFor="country" className="form-label">Country *</label>
            <select
              className={`form-select ${errors.country ? 'is-invalid' : ''}`}
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select your country</option>
              <option value="Denmark">Denmark</option>
              <option value="Sweden">Sweden</option>
              <option value="Norway">Norway</option>
              <option value="Finland">Finland</option>
            </select>
            {errors.country && <div className="invalid-feedback">{errors.country}</div>}
          </div>

          {/* Billing Address Toggle */}
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="billingDifferent"
              name="billingDifferent"
              checked={formData.billingDifferent}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="billingDifferent">
              Different Billing Address
            </label>
          </div>

          {/* Billing Address Form */}
          {formData.billingDifferent && (
            <BillingAddressForm
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          )}
        </div>
      </div>

      {/* Shipping Options Card */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>Shipping Method</h5>
        </div>
        <div className="card-body">
        <ShippingOptions
          shippingOption={shippingOption}
          setShippingOption={setShippingOption}
        />
        </div>
      </div>

      {/* Payment Options Card */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>Payment Options</h5>
        </div>
        <div className="card-body">
          <PaymentOptions
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="card mb-4">
      <button type="submit" className="btn btn-primary">
        Complete Order
      </button>
      </div>
    </form>
  );
};

export default CheckoutForm;