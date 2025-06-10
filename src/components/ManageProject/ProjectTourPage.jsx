import React from "react";
import styles from "./ProjectTourPage.module.css";

const ProjectTourPage = () => {
    return (
        <div>
            <div className={styles.hero}>
                {/* <ZigzagConnector /> */}
                {/* <StepwiseCurvedPath /> */}
            </div>

            <div className={styles.content}>
                <h1>Welcome to the Project Dashboard</h1>
                <p>
                    Explore the features of your project with an intuitive walkthrough or access detailed
                    guides to maximize productivity and collaboration.
                </p>

                <div className={styles.buttonGroup}>
                    <a className={styles.button} href="#">Take Project Tour</a>
                    <a className={styles.button} href="#">View User Guide</a>
                </div>
            </div>
        </div>
    );
};

export default ProjectTourPage;
