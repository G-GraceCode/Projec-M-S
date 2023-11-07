import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Project from "./pages/Project";
import SettingProfile from "./pages/SettingProfile";
import LogoutPage from "./pages/LogoutPage";
import Home from "./pages/Home";
// import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./ultContext/AuthContext";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/app" element={<Home />} />
            <Route path="/project" element={<Project />} />
            <Route path="/profile" element={<SettingProfile />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
