import { Outlet, Navigate } from "react-router-dom";
import { userAuth } from "../ultContext/AuthContext";
import "../index.css";

const PrivateRoutes = () => {
  const usertoken = localStorage.getItem("token");

  return <>{usertoken ? <Outlet className="PrivateRoutes" /> : <Navigate to="/" />}</>;
};

export default PrivateRoutes;
