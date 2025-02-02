import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  isAuthenticated: boolean;
  user: GoogleUser | null;
  login: (credentialResponse: any) => void;
  logout: () => void;
}

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<GoogleUser | null>(null);

  useEffect(() => {
    // Check for existing token on startup
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          name: decoded.name as string,
          email: decoded.email as string,
          picture: decoded.picture as string
        });
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('auth_token');
      }
    }
  }, []);

  const login = (credentialResponse: any) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser({
      name: decoded.name as string,
      email: decoded.email as string,
      picture: decoded.picture as string
    });
    setIsAuthenticated(true);
    localStorage.setItem('auth_token', credentialResponse.credential);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth_token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);