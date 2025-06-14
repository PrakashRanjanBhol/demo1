import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast } from './Toast';
import styles from './Toast.module.css';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((type, title, message) => {
        const id = Date.now() + Math.random(); // More unique than just Date.now
        setToasts((prev) => [...prev, { id, type, title, message }]);

        // Auto-remove toast after 5 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    }, []);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {/* Bottom-right toast container */}
            <div className={styles.toastWrapper}>
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        type={toast.type}
                        title={toast.title}
                        message={toast.message}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
