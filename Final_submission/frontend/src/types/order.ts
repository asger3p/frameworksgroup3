export interface OrderFormValues {
    // Structure for the checkout form the user fills out
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zip: string;
    country: string;
    billingDifferent: boolean; 
    // Optional fields have a ?
        billingFirstName?: string;
        billingLastName?: string;
        billingAddress?: string;
        billingCity?: string;
        billingZip?: string;
        billingCountry?: string;
    shippingOption: "standard" | "express";
    paymentMethod: "creditCard" | "mobilePay" | "applePay";
    cardName?: string;
    cardNumber?: string;
    expDate?: string;
    cvv?: string;
}