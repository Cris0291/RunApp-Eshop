import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext<any>(null);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <GlobalContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (context === undefined)
    throw new Error("Context was used outside of provider");
  return context;
}
