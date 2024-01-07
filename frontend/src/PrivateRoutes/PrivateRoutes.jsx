import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { userAuth } from "../ultContext/AuthContext";
import "../index.css";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const PrivateRoutes = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default PrivateRoutes;
