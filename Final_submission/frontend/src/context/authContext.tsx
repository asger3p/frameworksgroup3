import { createContext, useContext, useState, ReactNode } from 'react';
import { useBasket } from "./basketContext";  // adjust path as needed
import { Customer } from "../types/customer"; // adjust path as needed

// Define the shape of your auth context state
interface AuthContextType {
  customer: Customer | null;
  login: (customer: Customer) => Promise<void>; // now async
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provide the context to your app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [customer, setCustomerState] = useState<Customer | null>(() => {
    const saved = localStorage.getItem("customer");
    return saved ? JSON.parse(saved) : null;
  });

  // Access basket context's setCustomer
   const { setCustomer: setBasketCustomer } = useBasket();

  // Login function — sets state, stores customer, and sync basket
  const login = async (customerData: Customer) => {

    setCustomerState(customerData);
    localStorage.setItem("customer", JSON.stringify(customerData));

    // Sync basket on login
    await setBasketCustomer(customerData.customer_id);
  };

  // Logout function — clears state and localStorage
  const logout = () => {
    setCustomerState(null);
    localStorage.removeItem("customer");
    // Optionally clear basket or set customer to null in BasketContext here if needed
  };

  return (
    <AuthContext.Provider value={{ customer: customer, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for components to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;  // <-- return the context here
};