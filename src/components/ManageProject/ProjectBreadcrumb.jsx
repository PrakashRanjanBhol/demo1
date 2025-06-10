import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ProjectBreadcrumb.module.css";
import { PiHouseBold } from "react-icons/pi";

const ProjectBreadcrumb = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const segments = location.pathname.split("/").filter(Boolean);

    const crumbs = [
        {
            label: <PiHouseBold size={16} />,
            path: "/",
        },
        ...segments.map((seg, index) => ({
            label: seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
            path: "/" + segments.slice(0, index + 1).join("/"),
        })),
    ];

    return (
        <nav className={styles.container}>
            {crumbs.map((crumb, i) => (
                <React.Fragment key={i}>
                    <div
                        className={`${styles.crumb} ${i === crumbs.length - 1 ? styles.active : ""}`}
                        onClick={() => i !== crumbs.length - 1 && navigate(crumb.path)}
                    >
                        {crumb.label}
                    </div>
                    {i < crumbs.length - 1 && <span className={styles.divider}>›</span>}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default ProjectBreadcrumb;
