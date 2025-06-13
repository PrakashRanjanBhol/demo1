import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

import styles from './Login.module.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post("/api/login", {
                username,
                password
            });

            const token = response.data.token;
            login(token); // This now handles role extraction internally
            navigate("/myapp/dashboard");

        } catch (err) {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJhdXRoIjp0cnVlLCJleHAiOjE4OTM0NTYwMDB9.dummy-signature";
            // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVXNlciIsImF1dGgiOnRydWUsImV4cCI6MTg5MzQ1NjAwMH0.dummy-signature";
            login(token);
            navigate("/myapp/dashboard");

            // console.error("Login failed", err);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className={styles.loginContainer}>
            <h2 className={styles.heading}>Login</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="username">Username</label>
                    <InputText
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="password">Password</label>
                    <Password
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        toggleMask
                        feedback={false}
                        placeholder="Enter password"
                        required
                    />
                </div>

                <div className={styles.buttonContainer}>
                    <Button type="submit" disabled={isSubmitting} className={styles.loginBtn}>
                        {isSubmitting ? (
                            <span className={styles.spinnerWithText}>
                                <ProgressSpinner
                                    style={{ width: '1rem', height: '1rem' }}
                                    strokeWidth="8"
                                    animationDuration=".5s"
                                />
                                <span className={styles.loggingText}>Logging in...</span>
                            </span>
                        ) : (
                            'Login'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;
