import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import {
  authenticateUser,
  authenticateUserFromToken,
  createUser,
} from "../services/auth";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("marvelToken");
    if (!token) return;
    const init = async () => {
      const newUser = await authenticateUserFromToken(token);
      if (!ignore) {
        setUser(newUser);
      }
    };
    let ignore = false;
    init();
    return () => {
      ignore = true;
    };
  }, []);

  const handleSignup = async (data) => {
    const newUser = await createUser(data);
    setUser(newUser);
    Cookies.set("marvelToken", newUser.token, { expires: 7 });
  };

  const handleLogin = async (data) => {
    const newUser = await authenticateUser(data);
    setUser(newUser);
    Cookies.set("marvelToken", newUser.token, { expires: 7 });
  };

  const handleLogout = () => {
    console.log("Logout");
    setUser(null);
    Cookies.remove("marvelToken");
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
