import { Outlet, Navigate } from "react-router-dom";
import { userAuth } from "../ultContext/AuthContext";

const PrivateRoutes = () => {
  const usertoken = localStorage.getItem("token");

  return <>{usertoken ? <Outlet /> : <Navigate to="/" />}</>;
};

export default PrivateRoutes;
