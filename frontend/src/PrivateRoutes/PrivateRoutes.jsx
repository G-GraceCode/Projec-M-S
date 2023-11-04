import { Outlet, Navigate } from "react-router-dom";
import { userAuth } from "../ultContext/AuthContext";

const PrivateRoutes = () => {
  const { user } = userAuth();
  console.log("pres", user);
  return <>{user ? <Outlet /> : <Navigate to="/" />}</>;
};

export default PrivateRoutes;
