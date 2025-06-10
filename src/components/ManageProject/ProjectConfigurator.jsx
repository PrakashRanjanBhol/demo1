import React from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import styles from "./ProjectConfigurator.module.css";

const roles = [
    { label: "Developer", value: "Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Tester", value: "Tester" },
];

const ProjectConfigurator = ({ onBack }) => {
    return (
        <div className={styles.createProjectContainer}>
            <div className={styles.formContainer}>
                <div className={`${styles.column} ${styles.basicSection}`}>
                    <fieldset className={`${styles.fieldset} h-100`}>
                        <legend className={styles.legend}>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                                alt="icon"
                                className={styles.icon}
                            />
                            Basic
                        </legend>

                        <div className="p-fluid">
                            <div className="field">
                                <label htmlFor="projectName">Project Name</label>
                                <InputText id="projectName" />
                            </div>

                            <div className="field">
                                <label htmlFor="description">Description</label>
                                <InputTextarea id="description" rows={3} />
                            </div>

                            <div className="field">
                                <label htmlFor="division">Division</label>
                                <InputText id="division" />
                            </div>

                            <div className="field">
                                <label htmlFor="role">Role</label>
                                <Dropdown id="role" options={roles} placeholder="Select Role" />
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div className={`${styles.column} ${styles.rightColumn}`}>
                    <fieldset className={`${styles.fieldset} ${styles.halfHeight}`}>
                        <legend className={styles.legend}>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                                alt="db"
                                className={styles.icon}
                            />
                            Database
                        </legend>

                        <div className="p-fluid">
                            <div className="field">
                                <label htmlFor="dbUrl">Database URL</label>
                                <InputText id="dbUrl" />
                            </div>

                            <div className="formgrid grid">
                                <div className="field col-6">
                                    <label htmlFor="dbUser">User Name</label>
                                    <InputText id="dbUser" />
                                </div>
                                <div className="field col-6">
                                    <label htmlFor="dbPass">Password</label>
                                    <InputText id="dbPass" type="password" />
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className={`${styles.fieldset} ${styles.halfHeight}`}>
                        <legend className={styles.legend}>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
                                alt="conf"
                                className={styles.icon}
                            />
                            Confluence
                        </legend>

                        <div className="p-fluid">
                            <div className="field">
                                <label htmlFor="confUser">User Name</label>
                                <InputText id="confUser" />
                            </div>
                            <div className="field">
                                <label htmlFor="confPass">Password</label>
                                <InputText id="confPass" type="password" />
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>

            <div className="w-100 d-flex justify-content-end align-items-center mt-3">
                <button className={styles.createProjectBtn}>Create Project</button>
            </div>
        </div>
    );
};

export default ProjectConfigurator;
