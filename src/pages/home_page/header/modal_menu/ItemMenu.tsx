import styles from './itemMenu.module.css'

interface ItemMenuProps {
    lable: string;
    menuHover: string;
    setMenuHover: React.Dispatch<React.SetStateAction<string>>
}

const ItemMenu: React.FC<ItemMenuProps> = ({ lable, menuHover, setMenuHover }) => {
    return <li
        className={`${(lable === menuHover) ? styles.isHover : null}`}
        onMouseMove={() => {
            setMenuHover(lable);
        }}
    >
        {lable}
    </li>
}

export default ItemMenu;