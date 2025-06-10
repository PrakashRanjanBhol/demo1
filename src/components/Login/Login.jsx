import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

import styles from "./Login.module.css";

const Login = () => {
    useEffect(() => {
        localStorage.removeItem("auth");
        localStorage.removeItem("role");
    }, []);

    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && role) {
            login(role);
            navigate("/myapp/dashboard");
        }
    };

    const roles = [
        { label: "User", value: "user" },
        { label: "Admin", value: "admin" }
    ];

    return (
        <div className={styles.wrapper}>
            <Card className={styles.card}>
                <h2 className={styles.title}>Login to Your Account</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="email">Email</label>
                        <InputText
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="role">Role</label>
                        <Dropdown
                            id="role"
                            value={role}
                            options={roles}
                            onChange={(e) => setRole(e.value)}
                            placeholder="Select role"
                        />
                    </div>
                    <Button type="submit" label="Login" className={styles.loginBtn} />
                </form>
            </Card>
        </div>
    );
};

export default Login;
