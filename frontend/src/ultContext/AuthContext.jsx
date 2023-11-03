import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //   const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    handleLogin();
  }, []);

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(
        "https://dtv62c-5000.csb.app/projec",
        {},
        { withCredentials: true },
      );
      console.log("data", data);
      steUser(data);
      //   setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const contextData = {
    user,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
