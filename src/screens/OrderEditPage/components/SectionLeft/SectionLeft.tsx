import { Box, Divider, Paper } from '@mui/material';
import React, { ReactNode } from 'react';
import styles from './SectionLeft.module.scss';

interface ISectionLeftProps {
    customerInfo: ReactNode;
    orderInfo: ReactNode;
    className?: ReactNode;
}

const SectionLeft: React.FC<ISectionLeftProps> = (props: ISectionLeftProps) => {
    const { customerInfo, className, orderInfo } = props;
    return (
        <Paper elevation={3} className={`${styles.sectionLeft} ${className}`}>
            <Box>{orderInfo}</Box>
            <Divider />
            <Box>{customerInfo}</Box>
        </Paper>
    );
};
SectionLeft.defaultProps = {
    className: '',
};

export default SectionLeft;
