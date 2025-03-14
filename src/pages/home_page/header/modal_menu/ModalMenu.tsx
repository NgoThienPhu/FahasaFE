import styles from './modalMenu.module.css';
import ItemMenu from './ItemMenu';
import MenuData from './MenuData';
import { useState } from 'react';

interface ModalMenuProps {
    showModalMenu: boolean;
}

const ModalMenu: React.FC<ModalMenuProps> = ({ showModalMenu }) => {

    const [menuHover, setMenuHover] = useState("Sách Trong Nước");
    const selectedMenu = MenuData.find((data) => data.menuName === menuHover);

    return (
        <div className={`${styles.subMenu} ${showModalMenu && styles.isShow}`}>
            <div className={styles.subMenuLeft}>
                <p className={styles.lable}>Danh mục sản phẩm</p>
                <ul className={styles.items}>
                    {
                        MenuData.map((subMenu, index) => {
                            return <ItemMenu
                                key={index}
                                lable={subMenu.menuName}
                                menuHover={menuHover}
                                setMenuHover={setMenuHover}
                            />
                        })
                    }
                </ul>
            </div>
            <div className={styles.subMenuRight}>
                {
                    selectedMenu &&
                    selectedMenu.subMenu.map((subMenu, index) => {
                        return (
                            <div
                                key={index}
                                className={styles.menu}
                            >
                                <p className={styles.subMenuName}>{subMenu.subMenuName.toUpperCase()}</p>
                                <div>
                                    {
                                        subMenu.subSubMenu.map((subSubMenu, index) => {
                                            return <p key={index} className={styles.subSubMenuName}>{subSubMenu}</p>
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ModalMenu