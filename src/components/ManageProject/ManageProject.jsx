import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import styles from "./ManageProject.module.css";

const ManageProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRootPage = location.pathname === "/myapp/project-management";

  const tiles = [
    {
      title: "Create Project",
      description: "Start a new project with all necessary details.",
      iconClass: "pi pi-plus", // PrimeReact plus icon
      onClick: () => navigate("create"),
    },
    {
      title: "Manage Projects",
      description: "View, edit, and delete existing projects.",
      iconClass: "pi pi-list", // PrimeReact list icon
      onClick: () => navigate("list"),
    },
  ];

  return (
    <div className={styles.dashboard}>
      {isRootPage ? (
        <>
          <div className={styles.mainContent}>
            <h2 className={styles.heading}>Project Management</h2>
            <p className={styles.subheading}>
              Organize and manage your projects with ease and flexibility.
            </p>

            <div className={styles.tileContainer}>
              {tiles.map((tile, idx) => {
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
                    <i className={`${styles.icon} ${tile.iconClass}`} aria-hidden="true" />
                    <div className={styles.content}>
                      <h3 className={styles.title}>{tile.title}</h3>
                      <p className={styles.description}>{tile.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default ManageProject;
