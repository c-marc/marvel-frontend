import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

import { authenticateUser, createUser } from "../services/auth";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const init =
    Cookies.get("marvelUser") && JSON.parse(Cookies.get("marvelUser"));
  const [user, setUser] = useState(init);

  const handleSignup = async (data) => {
    const user = await createUser(data);
    setUser(user);
    Cookies.set("marvelUser", JSON.stringify(user));
  };

  const handleLogin = async (data) => {
    const user = await authenticateUser(data);
    setUser(user);
    Cookies.set("marvelUser", JSON.stringify(user));
  };

  const handleLogout = () => {
    console.log("Logout");
    setUser(null);
    Cookies.remove("marvelUser");
  };

  const value = {
    user,
    handleSignup: handleSignup,
    handleLogin,
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
