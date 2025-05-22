import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useBasket } from "./basketContext";  // Adjust path as needed
import { Customer } from "../types/customer"; // Adjust path as needed

// Define the shape of your auth context state
interface AuthContextType {
  customer: Customer | null;
  login: (customer: Customer) => Promise<void>;
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

  const { setCustomer: setBasketCustomer } = useBasket();

  // Login function — sets state, stores customer, and syncs basket
  const login = async (customerData: Customer) => {
    setCustomerState(customerData);
    localStorage.setItem("customer", JSON.stringify(customerData));
    await setBasketCustomer(customerData.customer_id); // Sync basket from DB
  };

  // Logout function — clears state and localStorage
 const logout = () => {
  setCustomerState(null);
  localStorage.removeItem("customer");
  setBasketCustomer(null); // Clear basket customer on logout
 
};

  // Sync basket if customer is remembered on page load
  useEffect(() => {
    if (customer) {
      setBasketCustomer(customer.customer_id);
    }
  }, [customer]);

  return (
    <AuthContext.Provider value={{ customer, login, logout }}>
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
  return context;
};
