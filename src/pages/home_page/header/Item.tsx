import styles from './header.module.css'

interface itemProps {
    lable: string;
    menuHover: string;
    setMenuHover: React.Dispatch<React.SetStateAction<string>>
}

const Item: React.FC<itemProps> = ({ lable, menuHover, setMenuHover }) => {
    return <li
        className={`${(lable === menuHover) ? styles.isHover : null}`}
        onMouseMove={() => {
            setMenuHover(lable);
        }}
    >
        {lable}
    </li>
}

export default Item;