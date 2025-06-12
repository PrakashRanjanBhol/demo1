import React from 'react';
import styles from './ThinkingIndicator.module.css';

const ThinkingIndicator = () => {
    return (
        <div className={styles.thinkingContainer}>
            <span className={styles.emoji} role="img" aria-label="thinking">🤔</span>
            <span className={styles.thinkingText}>Thinking</span>
            <span className={styles.dots}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
            </span>
        </div>
    );
};

export default ThinkingIndicator;
