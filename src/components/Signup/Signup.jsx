import React, { useState } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css';

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: null,
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const roles = [
        { label: 'User', value: 'User' },
        { label: 'Manager', value: 'Manager' },
        { label: 'Admin', value: 'Admin' },
        { label: 'Super Admin', value: 'Super Admin' }
    ];

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
        setErrors((prev) => ({
            ...prev,
            [field]: null
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.firstName || formData.firstName.length > 30) {
            newErrors.firstName = 'First name is required and must be at most 30 characters.';
        }

        if (!formData.lastName || formData.lastName.length > 30) {
            newErrors.lastName = 'Last name is required and must be at most 30 characters.';
        }

        if (!formData.email || !formData.email.includes('@')) {
            newErrors.email = 'Valid email is required.';
        }

        if (!formData.password || formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
        }

        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }

        if (!formData.role) {
            newErrors.role = 'Please select a role.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        try {
            const response = await axios.post('https://your-api.com/api/register', formData);

            console.log('API response:', response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/login');
        } catch (error) {
            console.error('API error:', error);
            alert('Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.registrationContainer}>
            <h2 className={styles.heading}>Register</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>First Name</label>
                        <InputText
                            value={formData.firstName}
                            onChange={(e) => handleChange('firstName', e.target.value)}
                            className={errors.firstName ? 'p-invalid' : ''}
                        />
                        {errors.firstName && <small className="p-error">{errors.firstName}</small>}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Last Name</label>
                        <InputText
                            value={formData.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                            className={errors.lastName ? 'p-invalid' : ''}
                        />
                        {errors.lastName && <small className="p-error">{errors.lastName}</small>}
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Email</label>
                        <InputText
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className={errors.email ? 'p-invalid' : ''}
                        />
                        {errors.email && <small className="p-error">{errors.email}</small>}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Role</label>
                        <Dropdown
                            value={formData.role}
                            options={roles}
                            onChange={(e) => handleChange('role', e.value)}
                            placeholder="Select Role"
                            className={errors.role ? 'p-invalid' : ''}
                        />
                        {errors.role && <small className="p-error">{errors.role}</small>}
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Password</label>
                        <Password
                            value={formData.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            toggleMask
                            feedback={false}
                            className={errors.password ? 'p-invalid' : ''}
                        />
                        {errors.password && <small className="p-error">{errors.password}</small>}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Confirm Password</label>
                        <Password
                            value={formData.confirmPassword}
                            onChange={(e) => handleChange('confirmPassword', e.target.value)}
                            toggleMask
                            feedback={false}
                            className={errors.confirmPassword ? 'p-invalid' : ''}
                        />
                        {errors.confirmPassword && <small className="p-error">{errors.confirmPassword}</small>}
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <Button type="submit" disabled={isSubmitting} className={styles.smallButton}>
                        {isSubmitting && (
                            <span className={styles.spinnerWrapper}>
                                <ProgressSpinner
                                    style={{ width: '1rem', height: '1rem' }}
                                    strokeWidth="8"
                                    animationDuration=".5s"
                                />
                            </span>
                        )}
                        <span style={{ marginLeft: isSubmitting ? '0.5rem' : '0' }}>
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </span>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
