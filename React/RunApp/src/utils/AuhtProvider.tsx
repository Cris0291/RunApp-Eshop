import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authStatus, setAuthStatus] = useState(false);
  const [authSignal, setAuthSignal] = useState(false);

  const logout = () => {
    Cookies.remove("Token");
    Cookies.remove("Order");
    Cookies.remove("Session");
    Cookies.remove("Address");
    Cookies.remove("Payment");
    window.location.replace("/");
  };

  useEffect(() => {
    const token = Cookies.get("Token");
    setAuthStatus(token !== undefined);
  }, [authSignal]);

  return (
    <AuthContext.Provider value={{ authStatus, logout, setAuthSignal }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Context was used outside of provider");
  return context;
}
