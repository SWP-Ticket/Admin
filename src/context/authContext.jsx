import { createContext, useState } from "react";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        openLogin,
        setOpenLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
