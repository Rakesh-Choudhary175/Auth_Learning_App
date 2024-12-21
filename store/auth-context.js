import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  login: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState();

  async function loginHandler(token) {
    setIsAuthenticated(token);
    await AsyncStorage.setItem("token", token);
  }

  const logoutHandler = async () => {
    setIsAuthenticated(null);
    await AsyncStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        token: isAuthenticated,
        isAuthenticated: !!isAuthenticated,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
