import * as react from 'react';
import styles from './headingWithSection.module.scss';

interface IHeadingWithSection {
    heading: react.ReactNode;
    section: react.ReactNode;
}

const HeadingWithSection: react.FC<IHeadingWithSection> = (props) => {
    const { heading, section } = props;
    return (
        <div className={styles.headingWithSection}>
            <div className={styles.heading}>{heading}</div>
            <div className={styles.section}>{section}</div>
        </div>
    );
};

export default HeadingWithSection;
