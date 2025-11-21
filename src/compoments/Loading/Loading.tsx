import React from 'react';
import './Loading.css';

export const Loading: React.FC<{notify?: string}> = ({notify}) => {
    return (
        <div className="loading">
            <div className="spinner"></div>
            <p className='loadingText'>{`${notify || "Đang tải..."}`}</p>
        </div>
    );
}