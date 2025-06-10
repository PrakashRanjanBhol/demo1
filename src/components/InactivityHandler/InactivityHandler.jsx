// src/components/InactivityHandler.js
import React, { useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const InactivityHandler = ({ children }) => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const timerRef = useRef(null);

    const logoutAfterInactivity = () => {
        logout();
        navigate("/login");
        alert("Logged out due to inactivity.");
    };

    const resetTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (isAuthenticated) {
            timerRef.current = setTimeout(logoutAfterInactivity, 30 * 60 * 1000); // 30 mins
        }
    };

    useEffect(() => {
        const events = ["mousemove", "keydown", "mousedown", "touchstart", "scroll"];
        events.forEach((event) => window.addEventListener(event, resetTimer));

        resetTimer(); // Start timer on mount

        return () => {
            events.forEach((event) => window.removeEventListener(event, resetTimer));
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isAuthenticated]);

    return <>{children}</>;
};

export default InactivityHandler;
