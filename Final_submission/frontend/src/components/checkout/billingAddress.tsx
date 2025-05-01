import React from "react";
import { OrderFormValues } from "../../types/order";

interface Props {
    formData: OrderFormValues;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const BillingAddressForm: React.FC<Props> = ({ formData, onChange }) => {
    return (
        <div className="mb-4">
            <div className="form-check mb-3">
                <input
                    type="checkbox"
                    name="billingDifferent"
                    className="form-check-input"
                    checked={formData.billingDifferent}
                    onChange={onChange}
                    id="billingDifferent"
                    />
                    <label htmlFor="billingDifferent" className="form-check-label">
                        Use different billing address
                    </label>
            </div>

            {/* Extra fields are only shown if user checks the checkbox for different billing address */}
            {formData.billingDifferent && (
                <div className="card p-3">
                    <h6>Billing Address</h6>

                    <input name="billingFirstName" placeholder="First Name *" value={formData.billingFirstName} onChange={onChange} className="form-control mb-2" />
                    <input name="billingLastName" placeholder="Last Name *" value={formData.billingLastName} onChange={onChange} className="form-control mb-2" />
                    <input name="billingAddress" placeholder="Street Address *" value={formData.billingAddress} onChange={onChange} className="form-control mb-2" />
                    <input name="billingCity" placeholder="City *" value={formData.billingCity} onChange={onChange} className="form-control mb-2" />
                    <input name="billingZip" placeholder="ZIP Code *" value={formData.billingZip} onChange={onChange} className="form-control mb-2" />

                    <label htmlFor="billingCountry" className="form-label">Billing Country *</label>
                    <select
                        id="billingCountry"
                        name="billingCountry"
                        value={formData.billingCountry} 
                        onChange={onChange} 
                        className="form-control" 
                        >
                        <option value="">Choose a Country *</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Sweden">Sweden</option>
                    </select>
                </div>
            )}
        </div>
    );
};

export default BillingAddressForm;