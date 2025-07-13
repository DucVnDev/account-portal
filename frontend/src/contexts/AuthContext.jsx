import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Log initial token value
  console.log("[AuthContext] Initial token:", token);

  const login = (jwt) => {
    console.log("[AuthContext] Logging in, saving token:", jwt);
    localStorage.setItem("token", jwt);
    setToken(jwt);
  };

  const logout = () => {
    console.log("[AuthContext] Logging out, removing token");
    localStorage.removeItem("token");
    setToken(null);
  };

  // Log token changes
  if (typeof window !== "undefined") {
    // Only log in browser environment
    window.__AUTHCONTEXT_LAST_TOKEN = window.__AUTHCONTEXT_LAST_TOKEN || token;
    if (window.__AUTHCONTEXT_LAST_TOKEN !== token) {
      console.log("[AuthContext] Token changed:", token);
      window.__AUTHCONTEXT_LAST_TOKEN = token;
    }
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}