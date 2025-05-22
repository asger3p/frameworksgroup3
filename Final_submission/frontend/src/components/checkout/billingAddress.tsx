import React from 'react';

interface BillingAddressFormProps {
  formData: any; // Holds the values of each input field
  errors: any; // Holds validation error messages for all fields
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // Handles input changes
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void; // Handles blur event for validation
}

// Billing address form component
const BillingAddressForm: React.FC<BillingAddressFormProps> = ({
  formData,
  errors,
  handleChange,
  handleBlur,
}) => {
  return (
    <div className="mt-4">
      <h5>Billing Address</h5>

      {/* First Name */}
      <div className="mb-3">
        <label htmlFor="billingFirstName" className="form-label">First Name *</label>
        <input
          type="text"
          className={`form-control ${errors.billingFirstName ? 'is-invalid' : ''}`}
          id="billingFirstName"
          name="billingFirstName"
          value={formData.billingFirstName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {/* Display validation error if present */}
        {errors.billingFirstName && (
          <div className="invalid-feedback">{errors.billingFirstName}</div>
        )}
      </div>

      {/* Last Name */}
      <div className="mb-3">
        <label htmlFor="billingLastName" className="form-label">Last Name *</label>
        <input
          type="text"
          className={`form-control ${errors.billingLastName ? 'is-invalid' : ''}`}
          id="billingLastName"
          name="billingLastName"
          value={formData.billingLastName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.billingLastName && (
          <div className="invalid-feedback">{errors.billingLastName}</div>
        )}
      </div>

      {/* Address */}
      <div className="mb-3">
        <label htmlFor="billingAddress" className="form-label">Address *</label>
        <input
          type="text"
          className={`form-control ${errors.billingAddress ? 'is-invalid' : ''}`}
          id="billingAddress"
          name="billingAddress"
          value={formData.billingAddress}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.billingAddress && (
          <div className="invalid-feedback">{errors.billingAddress}</div>
        )}
      </div>

      {/* City */}
      <div className="mb-3">
        <label htmlFor="billingCity" className="form-label">City *</label>
        <input
          type="text"
          className={`form-control ${errors.billingCity ? 'is-invalid' : ''}`}
          id="billingCity"
          name="billingCity"
          value={formData.billingCity}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.billingCity && (
          <div className="invalid-feedback">{errors.billingCity}</div>
        )}
      </div>

      {/* ZIP Code */}
      <div className="mb-3">
        <label htmlFor="billingZip" className="form-label">ZIP Code *</label>
        <input
          type="text"
          className={`form-control ${errors.billingZip ? 'is-invalid' : ''}`}
          id="billingZip"
          name="billingZip"
          value={formData.billingZip}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.billingZip && (
          <div className="invalid-feedback">{errors.billingZip}</div>
        )}
      </div>

      {/* Country */}
      <div className="mb-3">
        <label htmlFor="billingCountry" className="form-label">Country *</label>
        <select
          className={`form-select ${errors.billingCountry ? 'is-invalid' : ''}`}
          id="billingCountry"
          name="billingCountry"
          value={formData.billingCountry}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="">Select your country</option>
          <option value="Denmark">Denmark</option>
          <option value="Sweden">Sweden</option>
          <option value="Norway">Norway</option>
          <option value="Finland">Finland</option>
        </select>
        {errors.billingCountry && (
          <div className="invalid-feedback">{errors.billingCountry}</div>
        )}
      </div>
    </div>
  );
};

export default BillingAddressForm;
