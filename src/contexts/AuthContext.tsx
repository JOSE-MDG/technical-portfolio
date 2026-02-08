import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAdmin: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_PASSWORD_HASH = import.meta.env.VITE_ADMIN_PASSWORD_HASH;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const stored = localStorage.getItem('portfolio-admin');
    const timestamp = localStorage.getItem('portfolio-admin-timestamp');
    
    if (stored === 'true' && timestamp) {
      const elapsed = Date.now() - parseInt(timestamp);
      if (elapsed < 24 * 60 * 60 * 1000) {
        return true;
      } else {
        localStorage.removeItem('portfolio-admin');
        localStorage.removeItem('portfolio-admin-timestamp');
        return false;
      }
    }
    return false;
  });

  const login = async (password: string): Promise<boolean> => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      if (hashHex === ADMIN_PASSWORD_HASH) {
        setIsAdmin(true);
        localStorage.setItem('portfolio-admin', 'true');
        localStorage.setItem('portfolio-admin-timestamp', Date.now().toString());
        console.log('✅ Login successful');
        return true;
      } else {
        console.log('❌ Invalid password');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('portfolio-admin');
    localStorage.removeItem('portfolio-admin-timestamp');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}