import React, { useState } from "react";
import styles from "./LazyImage.module.css";

interface LazyImageProps {
    src: string;
    alt?: string;
    className?: string;
    /** Optional placeholder (e.g. text) shown while loading or if no src */
    placeholder?: React.ReactNode;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt = "", className, placeholder }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <span className={styles.wrapper}>
            {!isLoaded && (
                <span className={styles.loadingState} aria-hidden>
                    {placeholder ?? <span className={styles.skeleton} />}
                </span>
            )}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                className={`${styles.img} ${isLoaded ? styles.imgLoaded : ""} ${className ?? ""}`}
                onLoad={() => setIsLoaded(true)}
            />
        </span>
    );
};

export default LazyImage;
