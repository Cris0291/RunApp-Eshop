import { UserDto } from "@/features/registration/contracts";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authStatus, setAuthStatus] = useState(false);
  const [authSignal, setAuthSignal] = useState(false);

  const login = (user: UserDto) => {
    Cookies.set("Session", JSON.stringify(user));
  };

  const logout = () => {
    Cookies.remove("Session");
  };

  useEffect(() => {
    const user = Cookies.get("Session");
    setAuthStatus(user !== undefined);
  }, [authSignal]);

  return (
    <AuthContext.Provider value={{ authStatus, login, logout, setAuthSignal }}>
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
