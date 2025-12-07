import React from 'react';
import styles from './Loading.module.css';

export const Loading: React.FC<{notify?: string}> = ({notify}) => {
    return (
        <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>{`${notify || "Đang tải..."}`}</p>
        </div>
    );
}