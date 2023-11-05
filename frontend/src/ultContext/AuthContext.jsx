import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import jsCookie from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //   const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async () => {
    try {
      const { data } = await axios.get(
        "https://dtv62c-5000.csb.app/projec/user/profile",
        { withCredentials: true },
      );

      // We destructure the data
      const { status, provedUser } = data;
      console.log("pro", provedUser);
      // we check if user is present
      if (status) {
        setUser(provedUser);
        localStorage.setItem("token", provedUser.token);
      } else {
        return console.log("no User");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleLogout = async () => {
    const userOut = await axios.post(
      "https://dtv62c-5000.csb.app/projec/user/logout",
      {},
      { withCredentials: true },
    );
    console.log("logout", userOut);
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    handleLogin();
  }, []);

  const contextData = {
    user,
    isAuthenticated,
    handleLogin,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const userAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
