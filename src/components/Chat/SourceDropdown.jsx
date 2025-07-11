import React, { useState, useRef, useEffect } from 'react';
import styles from './SourceDropdown.module.css';

const SourceDropdown = ({ onSelect }) => {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const dropdownRef = useRef(null);

    const options = [
        { label: 'Excel', value: 'Excel' },
        { label: 'PPT', value: 'PPT' },
        { label: 'Confluence', value: 'Confluence' },
        {
            label: 'Others',
            children: [
                { label: 'Database', value: 'Database' },
                { label: 'Logs', value: 'Logs' },
                { label: 'Auto', value: 'Auto' },
            ],
        },
    ];

    const handleSelect = (value) => {
        setSelected(value);
        setVisible(false);
        onSelect?.(value);
    };

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.dropdownWrapper} ref={dropdownRef}>
            <div className={styles.dropdown} onClick={() => setVisible(!visible)}>
                {selected || 'Source'}
                <span className={styles.arrow}>▾</span>
            </div>

            {visible && (
                <div className={styles.menu}>
                    {options.map((opt, i) => (
                        <div key={i}>
                            <div
                                className={styles.menuItem}
                                onClick={() => !opt.children && handleSelect(opt.value)}
                            >
                                {opt.label}
                            </div>
                            {opt.children && (
                                <div className={styles.subMenu}>
                                    {opt.children.map((child, j) => (
                                        <div
                                            key={j}
                                            className={styles.subMenuItem}
                                            onClick={() => handleSelect(child.value)}
                                        >
                                            {child.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SourceDropdown;
