import React, { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const saved = localStorage.getItem("theme") || "light";
        setTheme(saved);
        document.documentElement.setAttribute("data-theme", saved);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <div className={styles.toggleWrapper} onClick={toggleTheme}>
            <div
                className={`${styles.toggleTrack} ${theme === "dark" ? styles.dark : styles.light}`}
            >
                <span className={styles.icon}>☀️</span>
                <span className={styles.icon}>🌙</span>
                <div className={styles.toggleThumb} />
            </div>
        </div>
    );
};

export default ThemeToggle;
