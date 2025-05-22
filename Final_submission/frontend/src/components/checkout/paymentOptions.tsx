import React from 'react';

interface PaymentOptionsProps {
  formData: any; // Current form state values
  errors: any; // Validation error messages
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Input change handler
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void; // Input blur handler for validation
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  formData,
  errors,
  handleChange,
  handleBlur,
}) => {
  return (
    <div className="mb-3">

        {/* Credit Card Option */}
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="radio"
            name="paymentMethod"
            id="creditCard"
            value="creditCard"
            checked={formData.paymentMethod === 'creditCard'}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="creditCard">
            Credit Card
          </label>

          {/* Credit Card Inputs: Only shown when credit card is selected */}
          {formData.paymentMethod === 'creditCard' && (
            <div className="mt-3 ms-4">
              {/* Cardholder Name Field */}
              <div className="mb-3">
                <label htmlFor="cardName" className="form-label">
                  Cardholder Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.cardName ? 'is-invalid' : ''}`}
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.cardName}
                  aria-describedby={errors.cardName ? 'cardNameError' : undefined}
                />
                {errors.cardName && (
                  <div className="invalid-feedback" id="cardNameError">
                    {errors.cardName}
                  </div>
                )}
              </div>

              {/* Card Number Field */}
              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">
                  Card Number <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.cardNumber}
                  aria-describedby={errors.cardNumber ? 'cardNumberError' : undefined}
                />
                {errors.cardNumber && (
                  <div className="invalid-feedback" id="cardNumberError">
                    {errors.cardNumber}
                  </div>
                )}
              </div>
              
              {/* Expiry Date Field */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="expDate" className="form-label">
                    Expiry Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.expDate ? 'is-invalid' : ''}`}
                    id="expDate"
                    name="expDate"
                    placeholder="MM/YY"
                    value={formData.expDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.expDate}
                    aria-describedby={errors.expDate ? 'expDateError' : undefined}
                  />
                  {errors.expDate && (
                    <div className="invalid-feedback" id="expDateError">
                      {errors.expDate}
                    </div>
                  )}
                </div>

                {/* CVV Field */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="cvv" className="form-label">
                    CVV <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.cvv}
                    aria-describedby={errors.cvv ? 'cvvError' : undefined}
                  />
                  {errors.cvv && (
                    <div className="invalid-feedback" id="cvvError">
                      {errors.cvv}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MobilePay Option */}
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="radio"
            name="paymentMethod"
            id="mobilepay"
            value="mobilepay"
            checked={formData.paymentMethod === 'mobilepay'}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="mobilepay">
            MobilePay
          </label>
        </div>

        {/* Apple Pay Option */}
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="paymentMethod"
            id="applepay"
            value="applepay"
            checked={formData.paymentMethod === 'applepay'}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="applepay">
            Apple Pay
          </label>
        </div>
      </div>
  );
};

export default PaymentOptions;