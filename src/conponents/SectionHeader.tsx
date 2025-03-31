import styles from './sectionHeader.module.css';

interface SectionHeaderProps {
    iconUrl: string;
    lable: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = (props) => {
    return (
        <div className={styles.header}>
            <img src={props.iconUrl} alt='icon-section-header' />
            <p>{props.lable}</p>
        </div>
    )
}

export default SectionHeader;