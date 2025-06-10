import React, { useState } from "react";
import ProjectSelector from "./ProjectSelector";
import ProjectConfigurator from "./ProjectConfigurator";
import styles from "./CreateProject.module.css";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1); // 1 = ProjectSelector, 2 = ProjectConfigurator
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleNext = (product) => {
        setSelectedProduct(product);
        setStep(2);
    };

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
        }
    };

    return (
        <div className={styles.createProjectContainer}>
            <div className={`d-flex justify-content-between align-items-center ${styles.actionHeader} ${styles.introSection}`}>
                <div className="d-flex gap-3">
                    <h2 className={styles.introHeading}>
                        <span
                            className={styles.linkText}
                            onClick={() => navigate("/myapp/project-management")}
                        >
                            Manage Project
                        </span>
                        <span className={styles.separator}>›</span>
                        <span className={styles.currentPageText}>Create Project</span>
                    </h2>


                </div>
                {/* <button className={styles.createProjectBtn}>View Projects</button> */}

                <div className={`d-flex align-items-center gap-3`}>
                    {step === 2 && (
                        <><button className={styles.backButton} onClick={handleBack}>
                            ← Back
                        </button><span className={styles.verticalDivider}></span></>
                    )}

                    <div
                        className={styles.projectListLink}
                        onClick={() => navigate("/myapp/project-management/list")}
                    >
                        Project List
                    </div>
                </div>

            </div>

            <div className={styles.alphaLayout}>
                {step === 1 ? (
                    <ProjectSelector onNext={handleNext} />
                ) : (
                    <ProjectConfigurator onBack={handleBack} product={selectedProduct} />
                )}
            </div>
        </div>
    );
};

export default CreateProject;
