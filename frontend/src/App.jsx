import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./ultContext/AuthContext";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/app" element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
