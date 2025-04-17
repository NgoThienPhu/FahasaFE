import { useEffect, useState } from 'react';
import styles from './tab.module.css';

interface TabProps {
    tabName: string;
    isActive: boolean;
    handleOnClick: React.Dispatch<React.SetStateAction<"Login" | "Register">>;
}

const Tab: React.FC<TabProps> = (props) => {

    const [isHover, setIsHover] = useState(false);

    useEffect(() => {
        if (props.isActive) setIsHover(true);
        else setIsHover(false);
    }, [props.isActive])

    function handleMouseMove() {
        if (!props.isActive) setIsHover(true);
    }

    function handleMouseLeave() {
        if (!props.isActive) setIsHover(false);
    }

    return (
        <div
            onClick={() => {
                if (props.tabName === "Đăng nhập") {
                    props.handleOnClick("Login");
                } else {
                    props.handleOnClick("Register");
                }
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`${styles.tab} ${isHover && styles.isHover}`}
        >
            <p>{props.tabName}</p>
            <div className={styles.tabUnderLine}></div>
        </div>
    )
}

export default Tab;