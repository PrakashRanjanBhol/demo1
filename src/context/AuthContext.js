import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ correct import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const token = localStorage.getItem("auth");
    let decodedRole = "";

    if (token) {
        try {
            const decoded = jwtDecode(token);
            decodedRole = decoded?.role || "";
        } catch (error) {
            console.error("Invalid token", error);
        }
    }

    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const [role, setRole] = useState(decodedRole);

    const login = (newToken) => {
        localStorage.setItem("auth", newToken);
        try {
            const decoded = jwtDecode(newToken);
            const userRole = decoded?.role || "";
            console.log(userRole);
            
            setIsAuthenticated(true);
            setRole(userRole);
        } catch (error) {
            console.error("Token decode failed", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("auth");
        setIsAuthenticated(false);
        setRole("");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
