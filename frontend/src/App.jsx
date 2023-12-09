import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landingpage from "./pages/Landingpage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Project from "./pages/Project";
import SettingProfile from "./pages/SettingProfile";
import LogoutPage from "./pages/LogoutPage";
import Home from "./pages/Home";
import EditProject from "./pages/EditProject";
import ViewProject from "./pages/ViewProject";
import ViewProfile from "./pages/ViewProfile";
// import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./ultContext/AuthContext";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/app" element={<Home />} />
            <Route path="/project" element={<Project />} />
            <Route path="/setting" element={<SettingProfile />} />
            <Route path="/profile" element={<ViewProfile />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/editproject/:id" element={<EditProject />} />
            <Route path="/viewing/:id" element={<ViewProject />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
