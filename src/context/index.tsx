import { createContext, useState, ReactNode, useEffect } from "react";

export interface AuthContextType {
  token: string | null;
  id: string | null;
  setAuthData: (
    token: string | null,
    id: string | null,
    expiresIn?: number
  ) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [id, setId] = useState<string | null>(localStorage.getItem("authId"));

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedId = localStorage.getItem("authId");
    const tokenExpiration = localStorage.getItem("authTokenExpiration");

    if (storedToken && tokenExpiration) {
      const expirationDate = new Date(parseInt(tokenExpiration));

      if (expirationDate > new Date()) {
        setToken(storedToken);
        setId(storedId);
      } else {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authTokenExpiration");
        localStorage.removeItem("authId");
      }
    }

    const interval = setInterval(() => {
      const tokenExpiration = localStorage.getItem("authTokenExpiration");
      if (tokenExpiration) {
        const expirationDate = new Date(parseInt(tokenExpiration));
        if (expirationDate <= new Date()) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("authTokenExpiration");
          localStorage.removeItem("authId");
          setToken(null);
          setId(null);
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const setAuthData = (
    token: string | null,
    id: string | null,
    expiresIn?: number
  ) => {
    if (token) {
      if (expiresIn) {
        localStorage.setItem("authTokenExpiration", expiresIn.toString());
      }
      localStorage.setItem("authToken", token);
      localStorage.setItem("authId", id || "");
    } else {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authTokenExpiration");
      localStorage.removeItem("authId");
    }
    setToken(token);
    setId(id);
  };

  return (
    <AuthContext.Provider value={{ token, id, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};
