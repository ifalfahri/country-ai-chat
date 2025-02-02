import { createContext, useContext, useState, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { CredentialResponse } from '@react-oauth/google';

interface GoogleJwtPayload {
    name?: string;
    email?: string;
    picture?: string;
  }

interface AuthContextType {
  isAuthenticated: boolean;
  user: GoogleUser | null;
  login: (credentialResponse: CredentialResponse) => void;
  logout: () => void;
}

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}


const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Initialize auth state from localStorage
        return !!localStorage.getItem('auth_token');
      });
      const [user, setUser] = useState<GoogleUser | null>(() => {
        // Initialize user from localStorage
        const token = localStorage.getItem('auth_token');
        if (token) {
          try {
            const decoded = jwtDecode<GoogleJwtPayload>(token);
            if (decoded.name && decoded.email && decoded.picture) {
              return {
                name: decoded.name,
                email: decoded.email,
                picture: decoded.picture
              };
            }
          } catch {
            localStorage.removeItem('auth_token');
          }
        }
        return null;
      });

      const login = (credentialResponse: CredentialResponse) => {
        const decoded = jwtDecode<GoogleJwtPayload>(credentialResponse.credential as string);
        if (decoded.name && decoded.email && decoded.picture) {
          const user = {
            name: decoded.name,
            email: decoded.email,
            picture: decoded.picture
          };
          setUser(user);
          setIsAuthenticated(true);
          localStorage.setItem('auth_token', credentialResponse.credential as string);
        }
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