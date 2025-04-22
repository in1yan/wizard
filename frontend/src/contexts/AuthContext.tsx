import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { username: string } | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in by looking for token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      const username = localStorage.getItem('username');
      setIsAuthenticated(true);
      setUser({ username: username || 'User' });
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      const response = await fetch('http://localhost:8000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || 'Login failed');
        return false;
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('username', username);
      setIsAuthenticated(true);
      setUser({ username });
      return true;
    } catch (err) {
      setError('An error occurred during login');
      return false;
    }
  };

  const register = async (username: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || 'Registration failed');
        return false;
      }

      return true;
    } catch (err) {
      setError('An error occurred during registration');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};