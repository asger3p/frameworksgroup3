import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useBasket } from "./basketContext";  // adjust path as needed

// Define the shape of your auth context state
interface AuthContextType {
  user: User | null;
  login: (user: User) => Promise<void>; // now async
  logout: () => void;
}

// Define the shape of a user (you can customize this)
interface User {
  customer_id: string; // to keep track of user data
  fname: string;
  email: string;
  // Add more fields if needed (e.g. role, token)
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provide the context to your app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });


  // Access basket context's setCustomer
  const { setCustomer } = useBasket();

  // Login function — sets state, stores user, and sync basket
  const login = async (userData: User) => {

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    // Sync basket on login
    await setCustomer(userData.customer_id);
  };

  // Logout function — clears state and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // Optionally clear basket or set customer to null in BasketContext here if needed
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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