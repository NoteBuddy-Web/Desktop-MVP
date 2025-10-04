import React, { createContext, useContext, useEffect, useState } from 'react';

// Mock User type for now - replace with Firebase User when ready
interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
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
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auto-login with mock user - no authentication required
    const checkAuth = () => {
      const savedUser = localStorage.getItem('mockUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Create a default mock user if none exists
        const defaultUser: User = {
          uid: 'mock-user-123',
          displayName: 'Demo User',
          email: 'demo@notebuddy.com',
          photoURL: null,
        };
        setUser(defaultUser);
        localStorage.setItem('mockUser', JSON.stringify(defaultUser));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('mockUser');
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    loading,
    signOut: handleSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
