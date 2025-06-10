import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css";
import ThemeToggle from "../Theme/ThemeToggle";

const Header = () => {
  const { logout, role, username } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const routeTitles = {
    "/myapp/project-management": "Manage Project",
    "/myapp/chat": "Chat",
    "/myapp/project-management/create": "Create Project",
    "/myapp/project-management/list": "Project List",
  };

  const fullPageTitle = routeTitles[location.pathname] || "";

  const [typedText, setTypedText] = useState("");
  const typingSpeed = 100;
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!fullPageTitle) {
      setTypedText("");
      return;
    }

    let currentIndex = 0;
    setTypedText("");

    if (intervalRef.current) clearInterval(intervalRef.current);

    const delayTimeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setTypedText((prev) => {
          const nextText = prev + fullPageTitle.charAt(currentIndex);
          currentIndex++;
          if (currentIndex >= fullPageTitle.length) {
            clearInterval(intervalRef.current);
          }
          return nextText;
        });
      }, typingSpeed);
    }, 200);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(delayTimeout);
    };
  }, [fullPageTitle]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigate to root page when clicking on "Application"
  const goToRoot = () => {
    navigate("/myapp"); // Adjust root path if necessary
  };

  return (
    <header className={styles.header}>
      <div className={styles.titleWrapper}>
        <h3 className={styles.title}>
          <span
            className={styles.clickableAppTitle}
            onClick={goToRoot}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                goToRoot();
              }
            }}
            style={{ cursor: "pointer" }}
          >
            Application
          </span>
          {typedText && <span className={styles.animatedPageType}> - {typedText}</span>}
        </h3>
      </div>

      <div className={styles.actions}>
        <ThemeToggle />
        <span className={styles.role}>Role: {role}</span>

        <div className={styles.profileWrapper} ref={dropdownRef}>
          <button
            className={styles.profileButton}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-label="User menu"
            type="button"
          >
            <span className={styles.profileInitial}>
              {username ? username.charAt(0).toUpperCase() : "A"}
            </span>
          </button>

          {menuOpen && (
            <div className={styles.dropdownMenu} role="menu">
              <div className={styles.username}>{username || "User"}</div>
              <button
                className={styles.logoutDropdownButton}
                onClick={handleLogout}
                role="menuitem"
                type="button"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
