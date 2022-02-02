import React from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './BackPage.module.scss';

interface Iprops {
    to: string;
    title: string;
    className?: string;
}

const BackPage: React.FC<Iprops> = (props) => {
    const { to, title, className } = props;
    return (
        <Box>
            <Link to={to} className={`${styles.backBtn} ${className}`}>
                <ArrowBackIcon />
                <h3>{title}</h3>
            </Link>
        </Box>
    );
};

BackPage.defaultProps = {
    className: '',
};

export default BackPage;
