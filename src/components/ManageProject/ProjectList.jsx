import React, { useState } from 'react';
import { Slider } from 'primereact/slider';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import styles from './ProjectList.module.css';
import { useNavigate } from 'react-router-dom';

const sampleProjects = [
    {
        id: 1,
        name: 'Project1',
        icon: 'pi pi-rocket',
        resources: [
            { name: 'Alice Smith', designation: 'Frontend Developer', allocation: 40 },
            { name: 'Bob Johnson', designation: 'Backend Developer', allocation: 60 },
            { name: 'Carol White', designation: 'UI/UX Designer', allocation: 30 },
            { name: 'David Brown', designation: 'QA Engineer', allocation: 50 },
            { name: 'Eve Black', designation: 'DevOps Engineer', allocation: 20 },
            { name: 'Frank Green', designation: 'Data Scientist', allocation: 70 }
        ]
    },
    {
        id: 2,
        name: 'Project2',
        icon: 'pi pi-rocket',
        resources: [
            { name: 'Grace Hopper', designation: 'Project Manager', allocation: 80 },
            { name: 'Heidi Clark', designation: 'Full Stack Dev', allocation: 60 },
            { name: 'Ivan Lee', designation: 'Mobile Developer', allocation: 50 },
            { name: 'Jackie Chan', designation: 'Security Analyst', allocation: 30 }
        ]
    },
    {
        id: 3,
        name: 'Project3',
        icon: 'pi pi-rocket',
        resources: [
            { name: 'Alice Smith', designation: 'Frontend Developer', allocation: 40 },
            { name: 'Bob Johnson', designation: 'Backend Developer', allocation: 60 },
            { name: 'Carol White', designation: 'UI/UX Designer', allocation: 30 },
            { name: 'David Brown', designation: 'QA Engineer', allocation: 50 },
            { name: 'Eve Black', designation: 'DevOps Engineer', allocation: 20 },
            { name: 'Frank Green', designation: 'Data Scientist', allocation: 70 }
        ]
    },
    {
        id: 4,
        name: 'Project4',
        icon: 'pi pi-rocket',
        resources: [
            { name: 'Alice Smith', designation: 'Frontend Developer', allocation: 40 },
            { name: 'Bob Johnson', designation: 'Backend Developer', allocation: 60 },
            { name: 'Carol White', designation: 'UI/UX Designer', allocation: 30 },
            { name: 'David Brown', designation: 'QA Engineer', allocation: 50 },
            { name: 'Eve Black', designation: 'DevOps Engineer', allocation: 20 },
            { name: 'Frank Green', designation: 'Data Scientist', allocation: 70 }
        ]
    },
    {
        id: 5,
        name: 'Project5',
        icon: 'pi pi-rocket',
        resources: [
            { name: 'Grace Hopper', designation: 'Project Manager', allocation: 80 },
            { name: 'Heidi Clark', designation: 'Full Stack Dev', allocation: 60 },
            { name: 'Ivan Lee', designation: 'Mobile Developer', allocation: 50 },
            { name: 'Jackie Chan', designation: 'Security Analyst', allocation: 30 }
        ]
    },
    {
        id: 6,
        name: 'Project6',
        icon: 'pi pi-rocket',
        resources: [
            { name: 'Alice Smith', designation: 'Frontend Developer', allocation: 40 },
            { name: 'Bob Johnson', designation: 'Backend Developer', allocation: 60 },
            { name: 'Carol White', designation: 'UI/UX Designer', allocation: 30 },
            { name: 'David Brown', designation: 'QA Engineer', allocation: 50 },
            { name: 'Eve Black', designation: 'DevOps Engineer', allocation: 20 },
            { name: 'Frank Green', designation: 'Data Scientist', allocation: 70 }
        ]
    },
];

const ProjectList = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState(sampleProjects);
    const [expandedProjects, setExpandedProjects] = useState({});

    const handleSliderChange = (projId, resourceIndex, value) => {
        const updated = [...projects];
        const project = updated.find(p => p.id === projId);
        if (project) {
            project.resources[resourceIndex].allocation = value;
            setProjects(updated);
        }
    };

    const toggleMore = (id) => {
        setExpandedProjects(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className={styles.projectManagementContainer}>

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
                        <span className={styles.currentPageText}>Project List</span>
                    </h2>


                </div>

                <div
                    className={styles.projectCreateLink}
                    onClick={() => navigate("../create")}
                >
                    Create Project
                </div>

            </div>

            <div className={styles.projectListDetails}>
                <div className={styles.projectGrid}>
                    {projects.map(project => {
                        const visibleResources = project.resources.slice(0, 3);
                        const hiddenResources = project.resources.slice(3);
                        const isExpanded = expandedProjects[project.id];
                        const totalResourcesCount = project.resources.length;

                        return (
                            <Card key={project.id} className={styles.projectCard}>
                                <div className={styles.projectHeader}>
                                    <div className={`d-flex gap-3 ${styles.raProjectTitle}`}>
                                        <div>
                                            <i className={`${project.icon} ${styles.projectIcon}`} />
                                        </div>
                                        <div className='d-flex flex-column'>
                                            <span>{project.name}</span>
                                            <div className={styles.resourceDesignation}>
                                                {totalResourcesCount.toString().padStart(2, '0')} Resources
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        icon="pi pi-plus-circle"
                                        className={styles.addResourceButton}
                                        tooltip="Add a new resource"
                                    />
                                </div>

                                <div className={styles.resourceList}>
                                    {visibleResources.map((res, index) => (
                                        <div key={`${res.name}-${res.designation}`} className={styles.resourceCard}>
                                            <div className={styles.resourceInfo}>
                                                <div className={styles.resourceName}>{res.name}</div>
                                                <div className={styles.resourceDesignation}>{res.designation}</div>
                                            </div>
                                            {/* <div className={styles.sliderContainer}>
                                                <div className={styles.allocationLabel}>{res.allocation}%</div>
                                                <Slider
                                                    value={res.allocation}
                                                    onChange={(e) => handleSliderChange(project.id, index, e.value)}
                                                    min={0}
                                                    max={100}
                                                    step={1}
                                                    aria-label={`Allocation for ${res.name}`}
                                                />
                                            </div> */}
                                        </div>
                                    ))}

                                    {hiddenResources.length > 0 && (
                                        <>
                                            <div
                                                className={styles.moreToggle}
                                                onClick={() => toggleMore(project.id)}
                                            >
                                                {isExpanded ? 'Hide Resources ▲' : `+${hiddenResources.length} more resources ▼`}
                                            </div>

                                            <div className={`${styles.moreContent} ${isExpanded ? styles.moreContentShow : styles.moreContentHide}`}>
                                                {hiddenResources.map((res, index) => (
                                                    <div key={`${res.name}-${res.designation}`} className={styles.resourceCard}>
                                                        <div className={styles.resourceInfo}>
                                                            <div className={styles.resourceName}>{res.name}</div>
                                                            <div className={styles.resourceDesignation}>{res.designation}</div>
                                                        </div>
                                                        {/* <div className={styles.sliderContainer}>
                                                            <div className={styles.allocationLabel}>{res.allocation}%</div>
                                                            <Slider
                                                                value={res.allocation}
                                                                onChange={(e) => handleSliderChange(project.id, index + 3, e.value)}
                                                                min={0}
                                                                max={100}
                                                                step={1}
                                                                aria-label={`Allocation for ${res.name}`}
                                                            />
                                                        </div> */}
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProjectList;
