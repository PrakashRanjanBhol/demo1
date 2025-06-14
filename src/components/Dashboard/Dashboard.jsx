import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Dashboard.module.css";
import { useToast } from '../../context/Toast/ToastContext';

const Dashboard = () => {
    const { showToast } = useToast();
    const { role } = useAuth();
    const navigate = useNavigate();

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning ☀️";
        if (hour < 18) return "Good Afternoon 🌤️";
        return "Good Evening 🌙";
    };

    // Define tiles
    const allTiles = [
        {
            title: "Manage Project",
            description: "Create, update, and monitor all your projects efficiently.",
            iconClass: "pi pi-cog",
            onClick: () => navigate("/myapp/project-management"),
            rolesAllowed: ["Admin", "Super Admin", "Manager"],
        },
        {
            title: "Chat Panel",
            description: "Collaborate with team members using our chat interface.",
            iconClass: "pi pi-comments",
            onClick: () => navigate("/myapp/chat"),
            rolesAllowed: ["Admin", "Super Admin", "Manager", "User"],
        },
    ];

    const visibleTiles = allTiles.filter(
        (tile) => !tile.rolesAllowed || tile.rolesAllowed.includes(role)
    );

    const handleToast = () => {
        // Your login logic...
        showToast('success', 'Operation Completed', 'Your data has been saved.');
    };

    return (
        <div className={styles.dashboard}>
            <button onClick={handleToast}>Toast</button>
            <div className={styles.mainContent}>
                <div className={styles.greetingContainer}>
                    <h2 className={styles.greeting}>{getGreeting()}</h2>
                    <p className={styles.welcome}>Welcome, <strong>{role || "Guest"}</strong></p>
                </div>
                <div className={styles.tileContainer}>
                    {visibleTiles.map((tile, idx) => {
                        const animationClass =
                            idx % 2 === 0 ? styles.slideFromLeft : styles.slideFromRight;

                        return (
                            <div
                                key={idx}
                                className={`${styles.tile} ${animationClass}`}
                                onClick={tile.onClick}
                                tabIndex={0}
                                role="button"
                                onKeyPress={(e) => {
                                    if (e.key === "Enter" || e.key === " ") tile.onClick();
                                }}
                            >
                                <i className={`${styles.icon} ${tile.iconClass}`} />
                                <div className={styles.content}>
                                    <h3 className={styles.title}>{tile.title}</h3>
                                    <p className={styles.description}>{tile.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
