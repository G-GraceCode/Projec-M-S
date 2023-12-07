import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { userAuth } from "../ultContext/AuthContext";
import "../index.css";
import Sidebar from "../components/Sidebar";

const PrivateRoutes = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default PrivateRoutes;
