import { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useContext, useState } from "react";
import { AuthContextType, GoogleJwtPayload, GoogleUser } from "../types";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize auth state from localStorage
    return !!localStorage.getItem("auth_token");
  });
  const [user, setUser] = useState<GoogleUser | null>(() => {
    // Initialize user from localStorage
    const token = localStorage.getItem("auth_token");
    if (token) {
      try {
        const decoded = jwtDecode<GoogleJwtPayload>(token);
        if (decoded.name && decoded.email && decoded.picture) {
          return {
            name: decoded.name,
            email: decoded.email,
            picture: decoded.picture,
          };
        }
      } catch {
        localStorage.removeItem("auth_token");
      }
    }
    return null;
  });

  const login = (credentialResponse: CredentialResponse) => {
    const decoded = jwtDecode<GoogleJwtPayload>(
      credentialResponse.credential as string
    );
    if (decoded.name && decoded.email && decoded.picture) {
      const user = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      };
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem(
        "auth_token",
        credentialResponse.credential as string
      );
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("auth_token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
