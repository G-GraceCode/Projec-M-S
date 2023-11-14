import { Outlet, Navigate } from "react-router-dom";
import { userAuth } from "../ultContext/AuthContext";
import "../index.css";
import Sidebar from "../components/Sidebar";

const PrivateRoutes = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};
export default PrivateRoutes;
