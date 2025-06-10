import React, { useState } from "react";
import styles from "./ProjectSelector.module.css";
import ProjectTourPage from "./ProjectTourPage";

const products = [
    { icon: "📦", name: "Product 1" },
    { icon: "🎯", name: "Product 2" },
    { icon: "🛠️", name: "Product 3" },
    { icon: "⚙️", name: "Product 4" },
    { icon: "🧪", name: "Product 5" },
    { icon: "💡", name: "Product 6" },
    { icon: "🚀", name: "Product 7" },
    { icon: "🔧", name: "Product 8" },
    { icon: "📊", name: "Product 9" },
    { icon: "🔬", name: "Product 10" }
];

const ProjectSelector = ({ onNext }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleNextClick = () => {
        if (selectedProduct) {
            onNext(selectedProduct);
        }
    };

    return (
        <>
            <div className={styles.leftPanel}>
                <div className={`d-flex justify-content-center align-items-center gap-2 ${styles.infoBox}`}>
                    <p className={styles.pointerLabel}>Please select a product to proceed further</p>
                    <div className={styles.animatedFinger}>👇</div>
                </div>

                <div className={styles.productList}>
                    {products.map((product, idx) => (
                        <div
                            key={idx}
                            className={`${styles.productCard} ${selectedProduct?.name === product.name ? styles.selected : ""}`}
                            onClick={() => setSelectedProduct(product)}
                        >
                            <div className={styles.productIcon}>{product.icon}</div>
                            <div className={styles.productLabel}>{product.name}</div>
                        </div>
                    ))}
                </div>

                <div className="w-100 d-flex justify-content-center align-items-center">
                    <button
                        className={styles.nextButton}
                        onClick={handleNextClick}
                        disabled={!selectedProduct}
                    >
                        Next
                    </button>
                </div>
            </div>

            <div className={styles.rightPanel}>
                <ProjectTourPage />
            </div>
        </>
    );
};

export default ProjectSelector;
