import React from 'react';

// Possible values for shipping options
type ShippingOption = 'standard' | 'express';

interface ShippingOptionsProps {
  shippingOption: ShippingOption; // Currently selected shipping option
  setShippingOption: (option: ShippingOption) => void; // Function to update the selected shipping option
}

const ShippingOptions: React.FC<ShippingOptionsProps> = ({
  shippingOption,
  setShippingOption,
}) => {
  return (
    <div className="mb-3">
      {/* Standard Shipping Option */}
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="shipping"
          id="standard"
          value="standard"
          checked={shippingOption === 'standard'}
          onChange={(e) => setShippingOption(e.target.value as ShippingOption)} // Cast input value to ShippingOption type
        />
        <label className="form-check-label" htmlFor="standard">
          Standard Shipping (3–5 days) – 39 kr
        </label>
      </div>

      {/* Express Shipping Option */}
      <div className="form-check mt-2">
        <input
          className="form-check-input"
          type="radio"
          name="shipping"
          id="express"
          value="express"
          checked={shippingOption === 'express'}
          onChange={(e) => setShippingOption(e.target.value as ShippingOption)}
        />
        <label className="form-check-label" htmlFor="express">
          Express Shipping (1–2 days) – 89 kr
        </label>
      </div>
    </div>
  );
};

export default ShippingOptions;
