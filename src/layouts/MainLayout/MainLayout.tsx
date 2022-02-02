import { Box, Container } from '@mui/material';
import React from 'react';
import styles from './MainLayout.module.scss';
import SideNav from '../SideNav';
import Header from '../Header';

interface Iprops {
    children: React.ReactNode;
}

const MainLayout: React.FC<Iprops> = ({ children }) => (
    <>
        <Header />
        <SideNav />
        <div className={styles.mainlayout}>
            <Box className={styles['mainlayout-page']}>
                <Container className={styles['mainlayout-content']}>{children}</Container>
            </Box>
        </div>
    </>
);

export default MainLayout;
