import { useEffect, useRef } from 'react';
import styles from './line.module.css';

interface LineProps {
    padding?: number;
    height?: number;
    backgroundColor?: string;
}

const Line: React.FC<LineProps> = ({ backgroundColor, height, padding }) => {

    const containerLineRef = useRef<HTMLDivElement | null>(null);
    const lineRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (padding && containerLineRef.current) containerLineRef.current.style.padding = `${padding}px`;
        if (height && lineRef.current) lineRef.current.style.height = `${height}px`;
        if (backgroundColor && lineRef.current) lineRef.current.style.backgroundColor = `${backgroundColor}`;
    }, [backgroundColor, height, padding])

    return (
        <div className={styles.containerLine} style={{ padding: `${padding}px` }}>
            <div
                className={styles.line}
                style={{ height: `${height}px`, backgroundColor }}
            ></div>
        </div>
    )
}

export default Line;