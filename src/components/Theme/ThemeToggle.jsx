import React, { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <button
            className={styles.toggleWrapper}
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            <div
                className={`${styles.toggleTrack} ${theme === "dark" ? styles.dark : styles.light
                    }`}
            >
                <span className={styles.icon}>☀️</span>
                <span className={styles.icon}>🌙</span>
                <div className={styles.toggleThumb} />
            </div>
        </button>
    );
};

export default ThemeToggle;
