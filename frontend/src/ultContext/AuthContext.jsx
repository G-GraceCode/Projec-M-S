import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          "https://trrmmy-5000.csb.app/projec/user/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        if (res.ok) {
          res.json().then((user) => {
            setUserInfo(user);
          });
        } else{
          navigate("/login")
        }
      } catch (e) {
        enqueueSnackbar("user Couldn't Logout", { variant: "error" });
        console.log("Could Not Edit the User", e.message);
      }
    };
    getUser();
  }, []);
  // const handleLogin = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       "https://dtv62c-5000.csb.app/projec/user/profile",

  //       { withCredentials: true },
  //     );

  //     // We destructure the data
  //     const { status, provedUser } = data;
  //     console.log("pro", provedUser);
  //     // we check if user is present
  //     if (status) {
  //       setUser(provedUser.user);
  //       localStorage.setItem("token", provedUser.token);
  //     } else {
  //       return console.log("no User");
  //     }
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };

  const handleLogout = async () => {
    const userOut = await fetch(
      "https://trrmmy-5000.csb.app/projec/user/logout",
      {
        credentials: "include",
        method: "Post",
      },
    );
    setUserInfo(null);
    navigate("/");
    enqueueSnackbar("user Successfully Logout", { variant: "success" });
  };

  // useEffect(() => {
  //   handleLogin();
  // }, []);

  const contextData = {
    userInfo,
    setUserInfo,
    // handleLogin,
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
