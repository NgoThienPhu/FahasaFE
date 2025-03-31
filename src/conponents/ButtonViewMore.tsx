import { useEffect, useRef } from 'react';
import styles from './buttonViewMore.module.css';

interface ButtonViewMoreProps {
    width?: string;
    height?: string;
    padding?: string;
    margin?: string;
}

const ButtonViewMore: React.FC<ButtonViewMoreProps> = (props) => {

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (buttonRef.current) {
            const style = buttonRef.current.style;
            if (props.width) style.width = props.width;
            if (props.height) style.height = props.height;
            if (props.padding) style.padding = props.padding;
            if (props.margin) style.margin = props.margin;
        }
    }, [props.width, props.height, props.padding, props.margin])

    return <button ref={buttonRef} className={styles.button}>Xem Thêm</button>
}

export default ButtonViewMore;