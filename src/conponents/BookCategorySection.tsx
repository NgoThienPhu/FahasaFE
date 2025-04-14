import { useEffect, useRef } from 'react';
import styles from './bookCategorySection.module.css';
import Line from './Line';

interface BookCategorySectionProps {
    children: React.ReactNode;
    isShowLine?: boolean;
    paddingMenu?: string;
    listMenu: string[];
}

const BookCategorySection: React.FC<BookCategorySectionProps> = (props) => {

    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (menuRef.current) {
            const style = menuRef.current.style;
            if (props.paddingMenu) style.padding = props.paddingMenu;
        }
    }, [props.paddingMenu])

    return (
        <div className={styles.container}>
            <div ref={menuRef} className={styles.menu}>
                {
                    props.listMenu.map((menu) => {
                        return <p>{menu}</p>
                    })
                }
            </div>
            {props.isShowLine && <Line padding={0} backgroundColor='#cdcfd0' />}
            {props.children}
        </div>
    )
}

export default BookCategorySection;