import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { userAuth } from "../ultContext/AuthContext";
import "../index.css";
import Sidebar from "../components/Sidebar";

const PrivateRoutes = () => {
  const [bar, setBar] = useState("active");
  return (
    <>
      {bar === "active" && <Sidebar />}
      <Outlet bar={() => setBar("close")} />
    </>
  );
};
export default PrivateRoutes;
