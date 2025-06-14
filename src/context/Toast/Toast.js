import React from 'react';
import styles from './Toast.module.css';
import { Button } from 'primereact/button';

export const Toast = ({ type, title, message, onClose }) => {
    const getIconClass = () => {
        switch (type) {
            case 'success':
                return 'pi pi-check-circle';
            case 'error':
                return 'pi pi-times-circle';
            case 'warning':
                return 'pi pi-exclamation-triangle';
            case 'info':
            default:
                return 'pi pi-info-circle';
        }
    };

    const colorMap = {
        success: '#4caf50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196f3'
    };

    const color = colorMap[type] || '#2196f3';

    return (
        <div className={`${styles.toast} ${styles[type]}`} style={{ borderColor: color }}>
            <i className={`${getIconClass()} ${styles.toastIcon}`} style={{ color }}></i>
            <div className={styles.toastContent}>
                <div className={styles.toastTitle}>{title}</div>
                <div className={styles.toastMessage}>{message}</div>
            </div>
            <Button
                icon="pi pi-times"
                className={styles.toastClose}
                onClick={onClose}
                aria-label="Close"
            />
        </div>
    );
};
