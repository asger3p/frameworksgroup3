import React from "react";
interface Props {
    shippingOption: "standard" | "express";
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ShippingOptions: React.FC<Props> = ({ shippingOption, onChange }) => {
    return (
        <div className="card mb-4">
            <div className="card-header">
                <h5>Shipping</h5>
            </div>
            <div className="card-body">
                <div className="form-check">
                    <input type="radio" name="shippingOption" value="standard" 
                    checked={shippingOption === "standard"}    // Read current shippingOption
                    onChange={onChange} className="form-check-input" id="standard" /> 
                    <label htmlFor="standard" className="form-check-label">Standard Shipping (3–5 days) – 39 kr</label>
                </div>
                <div className="form-check">
                    <input type="radio" name="shippingOption" value="express" 
                    checked={shippingOption === "express"}     // Read current shippingOption
                    onChange={onChange} className="form-check-input" id="express" />
                    <label htmlFor="express" className="form-check-label">Express Shipping (1–2 days) – 89 kr</label>
                </div>
            </div>
        </div>
    );
};

export default ShippingOptions;