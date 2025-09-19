import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
    try {
        const stored = localStorage.getItem("user");
        if (!stored) return null; 
        return JSON.parse(stored); 
    } catch (error) {
        console.warn("Error parsing user from localStorage:", error);
        return null;
    }
    });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
