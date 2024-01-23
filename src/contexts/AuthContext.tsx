// AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  initialLoggedIn?: boolean;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, initialLoggedIn = false }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    // Check localStorage for persisted state
    const storedLoggedIn = localStorage.getItem('userLoggedInStatus');
    return storedLoggedIn ? JSON.parse(storedLoggedIn) : initialLoggedIn;
  });

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('userLoggedInStatus', JSON.stringify(true));
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('userLoggedInStatus', JSON.stringify(false));
  };

  // Add an effect to update isLoggedIn when localStorage changes in other tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'userLoggedInStatus') {
        setIsLoggedIn(event.newValue === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const contextValue: AuthContextType = {
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
