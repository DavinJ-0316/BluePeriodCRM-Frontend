import { Box, Container } from '@mui/material';
import React from 'react';
import styles from './SubLayout.module.scss';
import SideNav from '../SideNav';
import Header from '../Header';

interface Iprops {
    children: React.ReactNode;
}
// resposive Container
// Children could set {width:100%} for usage of reposibility.
const SubLayout: React.FC<Iprops> = ({ children }) => (
    <>
        <Header />
        <SideNav />
        <div className={styles.sublayout}>
            <Box className={styles['sublayout-page']}>
                <Container className={styles['sublayout-content']}>{children}</Container>
            </Box>
        </div>
    </>
);

export default SubLayout;
