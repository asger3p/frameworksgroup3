import React from "react";
import { OrderFormValues } from "../../types/order";

interface Props {
    formData: OrderFormValues;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentOptions: React.FC<Props> = ({ formData, onChange }) => {
    return (
        <div className="card mb-4">
            <div className="card-header">
                <h5>4. Payment</h5>
            </div>
            <div className="card-body">
                <div className="form-check">
                    <input type="radio" name="paymentMethod" value="creditCard" checked={formData.paymentMethod === "creditCard"} onChange={onChange} className="form-check-input" id="creditCard" />
                    <label htmlFor="creditCard" className="form-check-label">Credit Card</label>
                </div>

                {/* If credit card is selected, show more fields */}
                {formData.paymentMethod === "creditCard" && (
                    <div className="mt-3">
                        <input name="cardName" placeholder="Name on Card *" value={formData.cardName} onChange={onChange} className="form-control mb-2" />
                        <input name="cardNumber" placeholder="Card Number *" value={formData.cardNumber} onChange={onChange} className="form-control mb-2" />
                        <input name="expDate" placeholder="Expiration Date *" value={formData.expDate} onChange={onChange} className="form-control mb-2" />
                        <input name="cvv" placeholder="CVV*" value={formData.cvv} onChange={onChange} className="form-control mb-2" />
                    </div>
                )}

                <div className="form-check mt-2">
                    <input type="radio" name="paymentMethod" value="mobilePay" checked={formData.paymentMethod === "mobilePay"} onChange={onChange} className="form-check-input" id="mobilePay" />
                    <label htmlFor="mobilePay" className="form-check-label">MobilePay</label>
                </div>

                <div className="form-check mt-2">
                    <input type="radio" name="paymentMethod" value="applePay" checked={formData.paymentMethod === "applePay"} onChange={onChange} className="form-check-input" id="applePay" />
                    <label htmlFor="applePay" className="form-check-label">Apple Pay</label>
                </div>
            </div>
        </div>
    );
};

export default PaymentOptions;