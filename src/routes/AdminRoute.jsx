// routes/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
    const { isAuthenticated, role } = useAuth();
    return isAuthenticated && role === "Admin" ? children : <Navigate to="/myapp/dashboard" />;
};

export default AdminRoute;
