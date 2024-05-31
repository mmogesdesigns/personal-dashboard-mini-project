import React, { createContext, useContext, ReactNode } from "react";

type SessionStorageContextType = {
  saveToken: (token: string) => void;
  getToken: () => string | null;
};

const SessionStorageContext = createContext<SessionStorageContextType | null>(
  null
);

const SessionStorageManager: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const saveToken = (token: string) => {
    try {
      sessionStorage.setItem("jwtToken", token);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  };

  const getToken = (): string | null => {
    try {
      return sessionStorage.getItem("jwtToken");
    } catch (error) {
      console.error("Error retrieving token:", error);
      return null;
    }
  };

  return (
    <SessionStorageContext.Provider value={{ saveToken, getToken }}>
      {children}
    </SessionStorageContext.Provider>
  );
};

export { SessionStorageManager, SessionStorageContext };
