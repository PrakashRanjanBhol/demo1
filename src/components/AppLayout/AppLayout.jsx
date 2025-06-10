import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./AppLayout.module.css";

const AppLayout = ({ children }) => {
    return (
        <div className={styles.appLayout}>
            <div className={styles.backgroundEffect}></div>
            <Header />
            <main className={styles.appMain}>{children}</main>
            <Footer />
        </div>
    );
};

export default AppLayout;
