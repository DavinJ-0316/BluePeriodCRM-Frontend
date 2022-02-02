import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Box, Alert } from '@mui/material';

import {
    verifyEmail,
    authUserSuccess,
    authUserStatus,
    authError,
    regMessage,
} from '../../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import ButtonPrimary from '../../components/Button';
import styles from './VerifyEmailPage.module.scss';

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const VerifyEmailPage = () => {
    const navigate = useNavigate();
    const query = useQuery();
    const message = useAppSelector(regMessage);
    const isSuccess = useAppSelector(authUserSuccess);
    const errorMsg = useAppSelector(authError);
    const status = useAppSelector(authUserStatus);
    const dispatch = useAppDispatch();

    const verifyHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const data = query.get('token');
        dispatch(verifyEmail(data));
    };

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                navigate({ pathname: `/login` });
            }, 5000);
        }
    }, [dispatch, isSuccess, navigate]);
    return (
        <Container className={styles['verifyPage-container']}>
            <Box className={styles['verifyPage-box']}>
                <h1>Verify Your Email Address!</h1>
                <p>Your Email cannot be used until your email address has been verified.</p>

                <ButtonPrimary onClick={verifyHandler} className={styles['verifyPage-btn']}>
                    Verify Now
                </ButtonPrimary>
                {status === 'failed' && errorMsg !== null ? (
                    <Alert severity="error">
                        <strong>{errorMsg}</strong>
                    </Alert>
                ) : (
                    ''
                )}
                {message !== '' && errorMsg === null && isSuccess === true ? (
                    <Alert severity="success">
                        <strong>{message}</strong>
                    </Alert>
                ) : (
                    ''
                )}
            </Box>
        </Container>
    );
};

export default VerifyEmailPage;
