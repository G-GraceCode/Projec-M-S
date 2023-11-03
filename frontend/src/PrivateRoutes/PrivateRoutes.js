import react, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../ultContext/AuthContext";

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);
  return <>{user ? <Outlet /> : <Navigate to="/" />}</>;
};

export default PrivateRoutes;
