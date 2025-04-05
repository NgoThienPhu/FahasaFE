import styles from './footerLink.module.css';

interface FooterLinkProps {
    text: string;
}

const FooterLink: React.FC<FooterLinkProps> = (props) => {
    return (
        <p className={styles.text}>{props.text}</p>
    )
}

export default FooterLink;