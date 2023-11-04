import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //   const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [cookies, removeCookie] = useCookies([]);
  const navigate = useNavigate();

  useEffect(() => {
    handleLogin();
  }, []);

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(
        "https://dtv62c-5000.csb.app/projec/user/",
        {},
        { withCredentials: true },
      );
      const { status } = data;
      if (status) {
        console.log("data", data);
        return setUser(data);
        // navigate("/app");
      } else {
        return console.log("no User");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const contextData = {
    user,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const userAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
