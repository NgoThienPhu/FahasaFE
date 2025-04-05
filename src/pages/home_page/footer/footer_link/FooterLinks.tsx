import styles from './FooterLinks.module.css';

interface FooterLinksProps {
    children: React.ReactNode;
    lable: string;
}

const FooterLinks: React.FC<FooterLinksProps> = (props) => {
    return (
        <div className={styles.container}>
            <p className={styles.lableHeader}>{props.lable}</p>
            {props.children}
        </div>
    )
}

export default FooterLinks;