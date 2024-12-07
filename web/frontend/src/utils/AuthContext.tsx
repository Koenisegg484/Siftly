import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for existing token on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Initial token check:', !!token); // Debug log
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string) => {
    console.log('Login called with token'); // Debug log
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    console.log('After login, isAuthenticated:', true); // Debug log
  };

  const logout = () => {
    console.log('Logout called'); // Debug log
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    console.log('After logout, isAuthenticated:', false); // Debug log
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  // Add additional logging to track context usage
  console.log('useAuth context:', context); 
  
  // Optional: Add a check to ensure the hook is used within an AuthProvider
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};