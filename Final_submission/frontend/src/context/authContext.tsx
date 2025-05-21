import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the shape of your auth context state
interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
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
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    try {
      localStorage.setItem("testKey", "1");
      localStorage.removeItem("testKey");
    } catch {
      alert("You're in Safari Private Mode. Login sessions may not work properly.");
    }
  }, []);
  
  
  // Login function — sets state and stores user
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Logout function — clears state and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
