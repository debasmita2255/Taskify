import React, { useEffect } from "react";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import Register from "./assets/pages/Register";
import Login from "./assets/pages/Login";
import Dashboard from "./assets/pages/Dashboard";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation(); //Get the current URL path

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userLoggedIn");
    if (isLoggedIn) {
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/register"
      ) {
        navigate("/dashboard", { replace: true });
        // replace:true This tells React Router: "Don't add this redirect to the browser's history at all, just replace the current URL.
      }
    } else {
      if (location.pathname !== "/login" && location.pathname !== "/register") {
        navigate("/login", { replace: true });
      }
    }
  }, [navigate, location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        {/* handle unknown URLs by creating a Catch-All Route */}
      </Routes>
    </>
  );
};

export default App;
