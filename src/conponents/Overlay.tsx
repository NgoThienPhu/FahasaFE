import styles from "./overlay.module.css"

interface OverlayProps {
    children: React.ReactNode;
    handleOnClick?: () => void;
}

const Overlay: React.FC<OverlayProps> = (props) => {
    return (
        <div
            onClick={props.handleOnClick}
            className={styles.container}
        >
            {props.children}
        </div>
    );
}

export default Overlay;