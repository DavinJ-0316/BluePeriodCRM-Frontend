import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Alert } from '@mui/material';
import styles from './ForgetPasswordPage.module.scss';
import InputField from '../../components/InputField';
import useInput from '../../hooks/useInput';
import ButtonPrimary from '../../components/Button';
import { validateEmail } from '../../utils/validator';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import MainIcon from '../../assets/images/logos/logoColorNoBG.png';

import {
    sendForgotemail,
    authError,
    authUserStatus,
    clearState,
    regMessage,
    authUserSuccess,
} from '../../store/slices/userSlice';

const inputEmailIsValid = (value: string) => validateEmail(value.toLowerCase());

const ForgetPasswordPage = () => {
    const errorMsg = useAppSelector(authError);
    const status = useAppSelector(authUserStatus);
    const message = useAppSelector(regMessage);
    const isSuccess = useAppSelector(authUserSuccess);
    const dispatch = useAppDispatch();
    const [formIsValid, setFormIsValid] = useState(false);

    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail,
    } = useInput(inputEmailIsValid, '');

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(emailIsValid);
        });
        return () => {
            clearTimeout(identifier);
        };
    }, [emailIsValid]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (formIsValid === false) {
            return;
        }

        dispatch(sendForgotemail({ email: emailValue }));
        resetEmail();
    };

    useEffect(
        () => () => {
            dispatch(clearState());
        },
        [dispatch],
    );

    return (
        <div className={styles.forgotPassword}>
            <img src={MainIcon} alt="mainicon" className={styles['forgotPassword-logo']} />
            <Box
                className={styles['forgotPassword-box']}
                component="form"
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <Typography className={styles['forgotPassword-title']}>
                    Recover my password
                </Typography>
                <span className={styles['forgotPassword-subTitle']}>
                    Tell us your email so we can send you a reset link
                </span>
                <InputField
                    required
                    id="email"
                    label="Email"
                    type="text"
                    value={emailValue}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    error={emailHasError}
                />
                {emailHasError && (
                    <p className={styles['forgotPassword-error']}>Please Enter valid Email</p>
                )}
                {status === 'failed' && errorMsg !== null ? (
                    <Alert severity="error">
                        <strong>{errorMsg}</strong>
                    </Alert>
                ) : (
                    ''
                )}
                {message !== '' && isSuccess === true ? (
                    <Alert severity="success">
                        <strong>{message}</strong>
                    </Alert>
                ) : (
                    ''
                )}
                <ButtonPrimary
                    className={styles['forgotPassword-btn']}
                    type="submit"
                    disabled={!formIsValid}
                >
                    Recover Password
                </ButtonPrimary>
                <p className={styles['forgotPassword-redirect']}>
                    Know your password? &nbsp;
                    <Link className={styles['forgotPassword-link']} to="/login">
                        Login
                    </Link>
                </p>
            </Box>
        </div>
    );
};
export default ForgetPasswordPage;
