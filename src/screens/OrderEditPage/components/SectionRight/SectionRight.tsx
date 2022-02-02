import React, { ReactNode } from 'react';
import styles from './SectionRight.module.scss';

interface ISectionRightProps {
    className?: string;
    products: ReactNode;
}

const SectionRight: React.FC<ISectionRightProps> = (props) => {
    const { className, products } = props;
    return <div className={`${styles.sectionRight} ${className}`}>{products}</div>;
};

SectionRight.defaultProps = {
    className: '',
};

export default SectionRight;
